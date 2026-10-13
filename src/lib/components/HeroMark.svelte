<script lang="ts">
	let { size = 320 }: { size?: number } = $props();
</script>

<!-- The full app-icon composition (K key + +/- operator keys) as vector, for the hero visual. -->
<svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<linearGradient id="hero-bg" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#1e1b4b" />
			<stop offset="1" stop-color="#312e81" />
		</linearGradient>
	</defs>
	<rect width="200" height="200" rx="40" fill="url(#hero-bg)" />

	<!-- big key -->
	<rect x="28" y="28" width="86" height="144" rx="20" fill="#ffffff" />
	<path
		d="M60 60a9 9 0 0 1 9 9v13.7l26-26a9 9 0 0 1 12.8 12.8L82 95l25.8 25.8a9 9 0 0 1-12.8 12.8l-26-26V121a9 9 0 0 1-18 0V69a9 9 0 0 1 9-9Z"
		fill="#1e1b4b"
	/>

	<!-- plus key -->
	<rect x="124" y="28" width="48" height="66" rx="14" fill="#34d399" />
	<path
		d="M148 46v30M133 61h30"
		stroke="#ffffff"
		stroke-width="8"
		stroke-linecap="round"
	/>

	<!-- minus key -->
	<rect x="124" y="106" width="48" height="66" rx="14" fill="#34d399" />
	<path d="M133 139h30" stroke="#ffffff" stroke-width="8" stroke-linecap="round" />
</svg>
