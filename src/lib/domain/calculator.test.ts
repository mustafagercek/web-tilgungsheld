import { describe, expect, it } from 'vitest';
import { calculateAmortization } from './calculator';

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
});
