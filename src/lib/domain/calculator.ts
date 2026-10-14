/**
 * Ported from `HomeLoanCalculator`/`RepaymentInputMode` in the iOS app (Swift) — a single phase,
 * no special repayments, no Zinsbindung/follow-up-rate split. That's the classic German
 * "Tilgungsrechner" shape: a fixed monthly payment, where the duration falls out of iterating
 * month by month rather than a closed-form formula, since the interest/principal split shifts
 * every month as the balance shrinks. All three repayment input modes ultimately resolve to that
 * same fixed monthly payment and run through the identical month-by-month loop.
 */

export interface MonthlyAmortizationEntry {
	/** 1-based month index since the schedule's (hypothetical) start. */
	month: number;
	interestAmount: number;
	principalAmount: number;
	remainingDebt: number;
}

export interface AmortizationResult {
	monthlyPayment: number;
	totalMonths: number;
	totalInterest: number;
	totalRepayment: number;
	schedule: MonthlyAmortizationEntry[];
}

/**
 * Simulates the loan month by month at a fixed payment until it's paid off.
 * @param annualInterestRate Decimal fraction, e.g. 0.035 for 3.5%.
 */
function runSchedule(
	principal: number,
	annualInterestRate: number,
	monthlyPayment: number
): AmortizationResult {
	const monthlyRate = annualInterestRate / 12;

	let balance = principal;
	let totalInterest = 0;
	let months = 0;
	const schedule: MonthlyAmortizationEntry[] = [];

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
		schedule.push({
			month: months,
			interestAmount: interest,
			principalAmount: principalPortion,
			remainingDebt: balance
		});
	}

	return {
		monthlyPayment,
		totalMonths: months,
		totalInterest,
		totalRepayment: principal + totalInterest,
		schedule
	};
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
	const monthlyPayment = (principal * (annualInterestRate + annualAmortizationRate)) / 12;
	return runSchedule(principal, annualInterestRate, monthlyPayment);
}

/**
 * Solves for the fixed monthly payment that pays off `principal` in exactly `years`, via the
 * standard annuity formula, then runs the same month-by-month simulation for the schedule.
 */
export function calculateFromDesiredDuration(
	principal: number,
	annualInterestRate: number,
	years: number
): AmortizationResult {
	const monthlyRate = annualInterestRate / 12;
	const months = Math.max(1, Math.round(years * 12));
	const monthlyPayment =
		monthlyRate === 0
			? principal / months
			: (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
	return runSchedule(principal, annualInterestRate, monthlyPayment);
}

/** The payment is given directly — the duration simply falls out of the simulation. */
export function calculateFromDesiredMonthlyPayment(
	principal: number,
	annualInterestRate: number,
	monthlyPayment: number
): AmortizationResult {
	return runSchedule(principal, annualInterestRate, monthlyPayment);
}

export type RepaymentMode = 'amortizationRate' | 'desiredDuration' | 'desiredMonthlyPayment';

export interface RepaymentInput {
	mode: RepaymentMode;
	/** Percent, e.g. 2 for 2%. Used when `mode` is `'amortizationRate'`. */
	amortizationRatePercent: number;
	/** Used when `mode` is `'desiredDuration'`. */
	desiredDurationYears: number;
	/** Used when `mode` is `'desiredMonthlyPayment'`. */
	desiredMonthlyPayment: number;
}

/**
 * @param annualInterestRatePercent Percent, e.g. 4.2 for 4.2% — matches the UI's own units, so
 * callers don't need to convert to a decimal fraction themselves.
 */
export function calculateForRepaymentInput(
	principal: number,
	annualInterestRatePercent: number,
	input: RepaymentInput
): AmortizationResult {
	const annualInterestRate = annualInterestRatePercent / 100;
	switch (input.mode) {
		case 'desiredDuration':
			return calculateFromDesiredDuration(principal, annualInterestRate, input.desiredDurationYears);
		case 'desiredMonthlyPayment':
			return calculateFromDesiredMonthlyPayment(
				principal,
				annualInterestRate,
				input.desiredMonthlyPayment
			);
		case 'amortizationRate':
			return calculateAmortization(
				principal,
				annualInterestRate,
				input.amortizationRatePercent / 100
			);
	}
}
