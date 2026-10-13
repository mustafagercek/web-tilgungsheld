import { defineConfig } from 'vitest/config';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},

			// GitHub Pages serves purely static files — no server runtime — so this has to be
			// `adapter-static` (not `adapter-auto`, which has no GitHub Pages target at all).
			adapter: adapter({
				fallback: undefined // every route is prerendered up front; see +layout.ts
			}),

			// Serving from the default https://mustafagercek.github.io/web-tilgungsheld/
			// project-page URL for now (no custom domain attached yet) — the site lives under
			// this subpath, not the root, so every asset link needs it prefixed or they'd all
			// resolve to the wrong place. Change this back to '' once a custom domain is attached
			// and the site is served from its root instead.
			paths: {
				base: '/web-tilgungsheld'
			}
		})
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
