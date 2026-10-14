<script lang="ts">
	/*
	 * A calculator-style money field, ported from the iOS app's `CurrencyAmountField`: digits
	 * accumulate at the end as you type, grouped with thousands separators live, cursor always
	 * pinned there so typing/backspacing acts like a calculator display rather than a text field.
	 */
	let {
		value = $bindable(),
		currencyCode = 'EUR',
		maxDigits = 8,
		locale = 'de-DE',
		compact = false
	}: {
		value: number;
		currencyCode?: string;
		maxDigits?: number;
		locale?: string;
		/** Smaller, right-aligned-in-place styling for use in a label-left/value-right row,
		 * instead of the large centered calculator-display look used for the loan amount. */
		compact?: boolean;
	} = $props();

	let inputEl: HTMLInputElement;

	const currencySymbol = $derived(currencyCode === 'EUR' ? '€' : currencyCode);
	const numberFormat = $derived(new Intl.NumberFormat(locale));

	function formatted(amount: number): string {
		return numberFormat.format(amount);
	}

	// Cursor sits at the end for any real amount so typing/backspacing acts on the last digit;
	// while showing the placeholder "0" it goes to the start instead, so the field reads as
	// empty and ready-to-type rather than looking like "0" was already entered.
	function positionCursor() {
		const position = inputEl.value === '0' ? 0 : inputEl.value.length;
		inputEl.setSelectionRange(position, position);
	}

	function handleInput() {
		const digits = inputEl.value.replace(/\D/g, '').slice(0, maxDigits);
		const parsed = digits === '' ? 0 : parseInt(digits, 10);
		value = parsed;
		inputEl.value = formatted(parsed);
		positionCursor();
	}
</script>

<div class="currency-amount" class:currency-amount--compact={compact}>
	<input
		bind:this={inputEl}
		type="text"
		inputmode="numeric"
		class="currency-amount__input"
		value={formatted(value)}
		oninput={handleInput}
		onfocus={positionCursor}
	/>
	<span class="currency-amount__symbol">{currencySymbol}</span>
</div>

<style>
	.currency-amount {
		display: flex;
		align-items: baseline;
		justify-content: center;
		gap: 6px;
	}

	.currency-amount--compact {
		justify-content: flex-end;
		gap: 5px;
	}

	.currency-amount__input {
		font-family: var(--font-sans);
		font-size: 32px;
		font-weight: 800;
		letter-spacing: -0.01em;
		color: var(--color-text);
		border: none;
		background: transparent;
		padding: 0;
		width: 7ch;
		text-align: right;
	}

	.currency-amount--compact .currency-amount__input {
		font-size: 16px;
		font-weight: 700;
		width: 5ch;
	}

	.currency-amount__input:focus {
		outline: none;
	}

	.currency-amount__symbol {
		font-size: 20px;
		font-weight: 700;
		color: var(--color-text-muted);
	}

	.currency-amount--compact .currency-amount__symbol {
		font-size: 14px;
	}
</style>
