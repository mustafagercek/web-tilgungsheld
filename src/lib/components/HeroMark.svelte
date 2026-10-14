<script lang="ts">
	let { size = 320 }: { size?: number } = $props();
</script>

<!-- The full app-icon composition (T key + +/- operator keys) as vector, for the hero visual. -->
<svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
	<defs>
		<linearGradient id="hero-bg" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#1e1b4b" />
			<stop offset="1" stop-color="#312e81" />
		</linearGradient>
	</defs>
	<rect width="200" height="200" rx="40" fill="url(#hero-bg)" />

	<!-- big key -->
	<rect x="28" y="32" width="86" height="136" rx="20" fill="#ffffff" />

	<!-- cape, a single smooth lobe tucked behind each shoulder -->
	<path d="M48 70C36 76 28 86 32 100C38 92 46 86 50 80Z" fill="#34d399" />
	<path d="M94 70C106 76 114 86 110 100C104 92 96 86 92 80Z" fill="#34d399" />

	<rect x="42" y="68" width="58" height="20" rx="10" fill="#1e1b4b" />
	<rect x="61" y="68" width="20" height="64" rx="10" fill="#1e1b4b" />

	<!-- plus key -->
	<rect x="124" y="32" width="64" height="64" rx="16" fill="#34d399" />
	<path
		d="M156 48v32M140 64h32"
		stroke="#ffffff"
		stroke-width="9"
		stroke-linecap="round"
	/>

	<!-- minus key -->
	<rect x="124" y="104" width="64" height="64" rx="16" fill="#34d399" />
	<path d="M140 136h32" stroke="#ffffff" stroke-width="9" stroke-linecap="round" />
</svg>
