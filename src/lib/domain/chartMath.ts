export interface ChartScale {
	width: number;
	height: number;
	min: number;
	max: number;
}

export interface ChartPoint {
	x: number;
	y: number;
}

export function pointsForSeries(values: number[], scale: ChartScale): ChartPoint[] {
	const { width, height, min, max } = scale;
	const span = max - min || 1;
	return values.map((value, index) => ({
		x: values.length > 1 ? (index / (values.length - 1)) * width : 0,
		y: height - ((value - min) / span) * height
	}));
}

export function linePath(points: ChartPoint[]): string {
	if (points.length === 0) return '';
	return points
		.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
		.join(' ');
}

export function areaPath(points: ChartPoint[], width: number, height: number): string {
	if (points.length === 0) return '';
	return `${linePath(points)} L${width} ${height} L0 ${height} Z`;
}
