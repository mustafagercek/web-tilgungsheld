// `adapter-static` needs every route prerendered at build time — there's no server at runtime
// to render anything on demand once it's just static files on GitHub Pages.
export const prerender = true;
