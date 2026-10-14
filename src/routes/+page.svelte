<script lang="ts">
	import { paths } from '#lib/i18n/paths.ts';
</script>

<!-- Only ever seen if the redirect in +page.ts somehow doesn't fire (e.g. JS disabled). -->
<main class="container fallback">
	<p>
		<a href={paths.home('de')}>Deutsch</a> · <a href={paths.home('en')}>English</a>
	</p>
</main>

<style>
	.fallback {
		padding-block: 64px;
		text-align: center;
	}
</style>
