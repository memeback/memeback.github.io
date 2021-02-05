// usage: deno run --allow-read --allow-write=date/
//                 src/generate.js src/page.ejs everything.json date/

import * as dejs from "https://deno.land/x/dejs@0.9.3/mod.ts";

const main = async (args) => {
  if (args.length != 3) {
    throw `wrong number of arguments: ${args.length}; expected 3`;
  }
  const [templatePath, jsonPath, outputDir] = args;

  const pages = JSON.parse(await Deno.readTextFile(jsonPath));

  const templateFile = await Deno.open(templatePath);
  const renderPage = await dejs.compile(templateFile);
  Deno.close(templateFile.rid);

  const dates = Object.keys(pages).sort();

  for (const [date, posts] of Object.entries(pages)) {
    const dir = `${outputDir}/${date}`;
    await Deno.mkdir(dir, { recursive: true });

    const [prevDate, nextDate] = adjacent(dates, date);

    Deno.writeTextFile(
      `${dir}/index.html`,
      await renderPage({
        nextDate,
        posts,
        prevDate,
      }),
      {
        append: false,
        create: true,
      },
    );
  }
};

const adjacent = (xs, x) => {
  const i = xs.indexOf(x);
  if (i === -1) throw `element ${x} not in array`;

  const last = xs.length - 1;
  const prev = i === 0 ? xs[last] : xs[i - 1];
  const next = i === last ? xs[0] : xs[i + 1];

  return [prev, next];
};

main(Deno.args);
