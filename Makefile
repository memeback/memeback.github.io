generate: style/memeback.css
	deno run --allow-read --allow-write=date/ src/generate.js everything.json date/
style/memeback.css: src/memeback.css.js
	deno run $< > $@

dev:
	find -type f -not -ipath '*.git*' | entr make generate

parse:
	deno run --allow-read src/parse.js input/*.html > everything.json

.PHONY: dev generate parse
