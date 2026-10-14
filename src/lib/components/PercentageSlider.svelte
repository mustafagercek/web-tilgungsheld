<script lang="ts">
	let {
		label,
		value = $bindable(),
		min = 0,
		max = 20,
		step = 0.05,
		decrementLabel = 'Decrease',
		incrementLabel = 'Increase'
	}: {
		label: string;
		value: number;
		min?: number;
		max?: number;
		step?: number;
		decrementLabel?: string;
		incrementLabel?: string;
	} = $props();

	function clamp(raw: number): number {
		return Math.min(Math.max(raw, min), max);
	}

	function decrement() {
		value = clamp(Number((value - step).toFixed(2)));
	}

	function increment() {
		value = clamp(Number((value + step).toFixed(2)));
	}

	function handleNumberInput(event: Event) {
		const raw = (event.currentTarget as HTMLInputElement).valueAsNumber;
		if (!Number.isNaN(raw)) value = clamp(raw);
	}

	function handleRangeInput(event: Event) {
		value = clamp(Number((event.currentTarget as HTMLInputElement).value));
	}

	const fillPercent = $derived(((value - min) / (max - min)) * 100);
</script>

<div class="percent-slider">
	<div class="percent-slider__header">
		<span class="percent-slider__label">{label}</span>
		<div class="percent-slider__value">
			<input
				type="number"
				class="percent-slider__number"
				value={value.toFixed(2)}
				step={step}
				oninput={handleNumberInput}
			/>
			<span class="percent-slider__unit">%</span>
		</div>
	</div>
	<div class="percent-slider__row">
		<button type="button" class="percent-slider__step" onclick={decrement} aria-label={decrementLabel}
			>−</button
		>
		<input
			type="range"
			class="percent-slider__range"
			{min}
			{max}
			{step}
			value={value}
			oninput={handleRangeInput}
			style:--fill="{fillPercent}%"
		/>
		<button type="button" class="percent-slider__step" onclick={increment} aria-label={incrementLabel}
			>+</button
		>
	</div>
</div>

<style>
	.percent-slider {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.percent-slider__header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
	}

	.percent-slider__label {
		font-size: 14px;
		font-weight: 600;
		color: var(--color-text-muted);
	}

	.percent-slider__value {
		display: flex;
		align-items: baseline;
		gap: 3px;
	}

	.percent-slider__number {
		width: 54px;
		text-align: right;
		font-family: var(--font-sans);
		font-size: 16px;
		font-weight: 700;
		color: var(--color-text);
		border: none;
		background: transparent;
		padding: 0;
		appearance: textfield;
		-moz-appearance: textfield;
	}

	.percent-slider__number::-webkit-outer-spin-button,
	.percent-slider__number::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.percent-slider__number:focus {
		outline: none;
	}

	.percent-slider__unit {
		font-size: 14px;
		font-weight: 700;
		color: var(--color-text-muted);
	}

	.percent-slider__row {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.percent-slider__step {
		all: unset;
		cursor: pointer;
		width: 26px;
		height: 26px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		color: var(--color-mint-dark);
		font-size: 17px;
		font-weight: 700;
		transition: background-color 0.15s ease;
	}

	.percent-slider__step:hover {
		background: rgba(52, 211, 153, 0.15);
	}

	.percent-slider__range {
		flex: 1;
		appearance: none;
		-webkit-appearance: none;
		height: 4px;
		border-radius: 2px;
		background: linear-gradient(
			to right,
			var(--color-mint) var(--fill, 0%),
			var(--color-border) var(--fill, 0%)
		);
		outline: none;
	}

	.percent-slider__range::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--color-mint-dark);
		border: 2px solid var(--color-surface);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
		cursor: pointer;
	}

	.percent-slider__range::-moz-range-thumb {
		width: 18px;
		height: 18px;
		border-radius: 50%;
		background: var(--color-mint-dark);
		border: 2px solid var(--color-surface);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
		cursor: pointer;
	}

	.percent-slider__range::-moz-range-track {
		height: 4px;
		border-radius: 2px;
		background: var(--color-border);
	}

	.percent-slider__range::-moz-range-progress {
		height: 4px;
		border-radius: 2px;
		background: var(--color-mint);
	}
</style>
