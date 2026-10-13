<script lang="ts">
	let { size = 40 }: { size?: number } = $props();
</script>

<!--
  Same "K" monogram as the iOS app icon's big key — rounded square, navy K, centered. Kept as a
  standalone SVG (not a cropped screenshot of the real icon) so it stays crisp at any size and can
  sit directly on any background color.
-->
<svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
	<rect width="100" height="100" rx="24" fill="#ffffff" />
	<path
		d="M34 26a7 7 0 0 1 7 7v10.6l20-20a7 7 0 0 1 9.9 9.9L54.9 50l16 16a7 7 0 0 1-9.9 9.9l-20-20V66a7 7 0 0 1-14 0V33a7 7 0 0 1 7-7Z"
		fill="#1e1b4b"
	/>
</svg>
