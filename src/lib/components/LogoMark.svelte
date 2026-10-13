<script lang="ts">
	let { size = 40 }: { size?: number } = $props();
</script>

<!--
  Same "T" monogram as the iOS app icon's big key — rounded square, navy T, centered. Kept as a
  standalone SVG (not a cropped screenshot of the real icon) so it stays crisp at any size and can
  sit directly on any background color.
-->
<svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
	<rect width="100" height="100" rx="24" fill="#ffffff" />
	<rect x="24" y="22" width="52" height="14" rx="7" fill="#1e1b4b" />
	<rect x="43" y="22" width="14" height="54" rx="7" fill="#1e1b4b" />
</svg>
