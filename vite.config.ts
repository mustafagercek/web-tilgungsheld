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

			// Empty because we're deploying to a custom domain (served from the root). If you
			// instead deploy to the default <user>.github.io/<repo> project-page URL without a
			// custom domain attached yet, set this to '/<repo-name>' so asset links resolve
			// correctly under that subpath.
			paths: {
				base: ''
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
