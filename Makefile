generate:
	deno run --allow-read --allow-write=date/ src/generate.js everything.json date/

parse:
	deno run --allow-read src/parse.js input/*.html > everything.json

.PHONY: parse generate
