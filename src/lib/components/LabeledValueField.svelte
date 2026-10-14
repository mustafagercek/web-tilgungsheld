<script lang="ts">
	let {
		label,
		value = $bindable(),
		unit,
		min = 0,
		step = 1
	}: {
		label: string;
		value: number;
		unit: string;
		min?: number;
		step?: number;
	} = $props();

	function handleInput(event: Event) {
		const raw = (event.currentTarget as HTMLInputElement).valueAsNumber;
		if (!Number.isNaN(raw)) value = Math.max(min, raw);
	}
</script>

<div class="labeled-value">
	<span class="labeled-value__label">{label}</span>
	<div class="labeled-value__input">
		<input type="number" {min} {step} {value} oninput={handleInput} />
		<span class="labeled-value__unit">{unit}</span>
	</div>
</div>

<style>
	.labeled-value {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
	}

	.labeled-value__label {
		font-size: 14px;
		font-weight: 600;
		color: var(--color-text-muted);
	}

	.labeled-value__input {
		display: flex;
		align-items: baseline;
		gap: 5px;
	}

	.labeled-value__input input {
		width: 4ch;
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

	.labeled-value__input input::-webkit-outer-spin-button,
	.labeled-value__input input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.labeled-value__input input:focus {
		outline: none;
	}

	.labeled-value__unit {
		font-size: 14px;
		font-weight: 700;
		color: var(--color-text-muted);
	}
</style>
