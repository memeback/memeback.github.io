parse:
	deno run --allow-read src/parse.js input/*.html > everything.json

generate:
	deno run --allow-read --allow-write=date/ src/generate.js src/page.ejs everything.json slogans.txt date/

.PHONY: parse generate
