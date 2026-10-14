import { describe, expect, it } from 'vitest';
import { areaPath, linePath, pointsForSeries } from './chartMath';

describe('pointsForSeries', () => {
	it('maps the max value to the top (y=0) and the min value to the bottom (y=height)', () => {
		const points = pointsForSeries([0, 50, 100], { width: 200, height: 100, min: 0, max: 100 });
		expect(points[2].y).toBeCloseTo(0, 5); // value 100 (max) -> top
		expect(points[0].y).toBeCloseTo(100, 5); // value 0 (min) -> bottom
		expect(points[1].y).toBeCloseTo(50, 5);
	});

	it('spreads points evenly across the full width', () => {
		const points = pointsForSeries([1, 2, 3, 4], { width: 300, height: 100, min: 0, max: 4 });
		expect(points[0].x).toBe(0);
		expect(points.at(-1)?.x).toBe(300);
	});
});

describe('linePath / areaPath', () => {
	it('starts with M and continues with L commands', () => {
		const points = pointsForSeries([0, 100], { width: 100, height: 100, min: 0, max: 100 });
		const path = linePath(points);
		expect(path.startsWith('M')).toBe(true);
		expect(path).toContain('L');
	});

	it('closes the area path down to the baseline', () => {
		const points = pointsForSeries([0, 100], { width: 100, height: 100, min: 0, max: 100 });
		const path = areaPath(points, 100, 100);
		expect(path.endsWith('Z')).toBe(true);
	});
});
