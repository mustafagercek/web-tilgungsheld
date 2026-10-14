<script lang="ts">
	/**
	 * `inverted` swaps to navy card / white T (the favicon's colors) — for placing the mark on a
	 * light background, where the default white card would otherwise all but disappear.
	 */
	let { size = 40, inverted = false }: { size?: number; inverted?: boolean } = $props();

	const cardColor = $derived(inverted ? '#1e1b4b' : '#ffffff');
	const letterColor = $derived(inverted ? '#ffffff' : '#1e1b4b');
</script>

<!--
  Same "T" monogram as the iOS app icon's big key — rounded square, navy T, centered. Kept as a
  standalone SVG (not a cropped screenshot of the real icon) so it stays crisp at any size and can
  sit directly on any background color.
-->
<svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
	<rect width="100" height="100" rx="24" fill={cardColor} />
	<path d="M29 24C20 28 14 36 17 46C21 40 27 36 30 31Z" fill="#34d399" />
	<path d="M71 24C80 28 86 36 83 46C79 40 73 36 70 31Z" fill="#34d399" />
	<rect x="24" y="22" width="52" height="14" rx="7" fill={letterColor} />
	<rect x="43" y="22" width="14" height="54" rx="7" fill={letterColor} />
</svg>
