// usage: deno run --allow-read --allow-write=date/
//                 src/generate.js src/page.ejs everything.json date/

import * as dejs from "https://deno.land/x/dejs@0.9.3/mod.ts";

const main = async (args) => {
  if (args.length != 3) {
    throw `wrong number of arguments: ${args.length}; expected 3`;
  }
  const [templatePath, jsonPath, outputDir] = args;

  const dates = JSON.parse(await Deno.readTextFile(jsonPath));

  const templateFile = await Deno.open(templatePath);
  const renderPage = await dejs.compile(templateFile);
  Deno.close(templateFile.rid);

  for (const [date, posts] of Object.entries(dates)) {
    const dir = `${outputDir}/${date}`;
    await Deno.mkdir(dir, { recursive: true });

    Deno.writeTextFile(
      `${dir}/index.html`,
      await renderPage({ posts }),
      {
        append: false,
        create: true,
      },
    );
  }
};

main(Deno.args);
