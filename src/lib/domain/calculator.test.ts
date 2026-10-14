import { describe, expect, it } from 'vitest';
import {
	calculateAmortization,
	calculateForRepaymentInput,
	calculateFromDesiredDuration,
	calculateFromDesiredMonthlyPayment
} from './calculator';

describe('calculateAmortization', () => {
	it('computes the monthly payment the same way the Swift original does', () => {
		// Same figures as the iOS app's "Musterkredit" preview loan.
		const result = calculateAmortization(250_000, 0.035, 0.02);
		// 250_000 * (0.035 + 0.02) / 12
		expect(result.monthlyPayment).toBeCloseTo(1145.83, 2);
	});

	it('fully amortizes a loan down to zero', () => {
		const result = calculateAmortization(250_000, 0.035, 0.02);
		expect(result.totalMonths).toBeGreaterThan(0);
		expect(result.totalRepayment).toBeCloseTo(250_000 + result.totalInterest, 2);
	});

	it('pays off faster with a higher amortization rate', () => {
		const slower = calculateAmortization(100_000, 0.03, 0.01);
		const faster = calculateAmortization(100_000, 0.03, 0.05);
		expect(faster.totalMonths).toBeLessThan(slower.totalMonths);
	});

	it('stops instead of looping forever when the payment cannot cover interest', () => {
		// 0% amortization rate and an interest rate above 0 means the fixed payment only ever
		// covers interest, never principal — this must terminate, not hang.
		const result = calculateAmortization(100_000, 0.04, 0);
		expect(result.totalMonths).toBe(0);
		expect(result.totalInterest).toBe(0);
	});

	it('produces a month-by-month schedule that sums back to the totals', () => {
		const result = calculateAmortization(250_000, 0.035, 0.02);
		expect(result.schedule).toHaveLength(result.totalMonths);
		expect(result.schedule.at(-1)?.remainingDebt).toBeCloseTo(0, 1);
		const summedInterest = result.schedule.reduce((sum, entry) => sum + entry.interestAmount, 0);
		expect(summedInterest).toBeCloseTo(result.totalInterest, 2);
	});
});

describe('calculateFromDesiredDuration', () => {
	it('pays off in exactly the requested number of years', () => {
		const result = calculateFromDesiredDuration(250_000, 0.035, 25);
		expect(result.totalMonths).toBe(25 * 12);
		expect(result.schedule.at(-1)?.remainingDebt).toBeCloseTo(0, 1);
	});

	it('falls back to a flat payment when the interest rate is zero', () => {
		const result = calculateFromDesiredDuration(120_000, 0, 10);
		expect(result.monthlyPayment).toBeCloseTo(1_000, 2);
		expect(result.totalMonths).toBe(120);
	});

	it('demands a higher payment for a shorter desired term', () => {
		const shorter = calculateFromDesiredDuration(250_000, 0.035, 15);
		const longer = calculateFromDesiredDuration(250_000, 0.035, 30);
		expect(shorter.monthlyPayment).toBeGreaterThan(longer.monthlyPayment);
	});
});

describe('calculateFromDesiredMonthlyPayment', () => {
	it('uses the given payment as-is and lets the duration fall out', () => {
		const result = calculateFromDesiredMonthlyPayment(250_000, 0.035, 1_200);
		expect(result.monthlyPayment).toBe(1_200);
		expect(result.totalMonths).toBeGreaterThan(0);
		expect(result.schedule.at(-1)?.remainingDebt).toBeCloseTo(0, 1);
	});

	it('pays off faster with a higher chosen payment', () => {
		const slower = calculateFromDesiredMonthlyPayment(250_000, 0.035, 1_000);
		const faster = calculateFromDesiredMonthlyPayment(250_000, 0.035, 1_500);
		expect(faster.totalMonths).toBeLessThan(slower.totalMonths);
	});
});

describe('calculateForRepaymentInput', () => {
	const base = { amortizationRatePercent: 2, desiredDurationYears: 25, desiredMonthlyPayment: 1_200 };

	it('dispatches to the amortization-rate calculation', () => {
		const result = calculateForRepaymentInput(250_000, 3.5, { ...base, mode: 'amortizationRate' });
		expect(result.monthlyPayment).toBeCloseTo(1145.83, 2);
	});

	it('dispatches to the desired-duration calculation', () => {
		const result = calculateForRepaymentInput(250_000, 3.5, { ...base, mode: 'desiredDuration' });
		expect(result.totalMonths).toBe(25 * 12);
	});

	it('dispatches to the desired-monthly-payment calculation', () => {
		const result = calculateForRepaymentInput(250_000, 3.5, {
			...base,
			mode: 'desiredMonthlyPayment'
		});
		expect(result.monthlyPayment).toBe(1_200);
	});
});
