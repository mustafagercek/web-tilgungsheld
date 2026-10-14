/**
 * There's no real persisted loan start date in the standalone calculator, so every schedule-based
 * view treats "this month" as month 1 and derives calendar dates from today — shared here so the
 * repayment plan table and the charts all agree on the same dates.
 */
export function dateForScheduleMonth(month: number): Date {
	const today = new Date();
	return new Date(today.getFullYear(), today.getMonth() + (month - 1), 1);
}
