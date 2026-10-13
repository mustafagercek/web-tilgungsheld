/**
 * Ported from `HomeLoanCalculator.calculatePhase` in the iOS app (Swift) — just the
 * `.amortizationRate` case, a single phase, no special repayments. That's the classic German
 * "Tilgungsrechner" shape: a fixed monthly payment (Zinssatz + anfängliche Tilgungsrate, split
 * across 12 months), where the duration falls out of iterating month by month rather than a
 * closed-form formula, since the interest/principal split shifts every month as the balance
 * shrinks.
 */

export interface AmortizationResult {
	monthlyPayment: number;
	totalMonths: number;
	totalInterest: number;
	totalRepayment: number;
}

/**
 * @param principal Loan amount in currency units (e.g. 250000).
 * @param annualInterestRate Decimal fraction, e.g. 0.035 for 3.5%.
 * @param annualAmortizationRate Decimal fraction, e.g. 0.02 for 2%.
 */
export function calculateAmortization(
	principal: number,
	annualInterestRate: number,
	annualAmortizationRate: number
): AmortizationResult {
	const monthlyRate = annualInterestRate / 12;
	const monthlyPayment = (principal * (annualInterestRate + annualAmortizationRate)) / 12;

	let balance = principal;
	let totalInterest = 0;
	let months = 0;

	// 1200 months (100 years) is a hard safety cap — the Swift original relies on
	// `autoAdjustInsufficientPayment` or a caller-supplied phase length to prevent an infinite
	// loop; this simple single-phase port has neither, so the cap stands in for both.
	while (balance > 0.01 && months < 1200) {
		const interest = balance * monthlyRate;
		const principalPortion = Math.min(monthlyPayment - interest, balance);
		if (principalPortion <= 0) break; // payment doesn't even cover the interest

		balance -= principalPortion;
		totalInterest += interest;
		months += 1;
	}

	return {
		monthlyPayment,
		totalMonths: months,
		totalInterest,
		totalRepayment: principal + totalInterest
	};
}
