// usage: deno run --allow-read --allow-write=date/ \
//                 src/generate.js everything.json date/

import * as dejs from "https://deno.land/x/dejs@0.9.3/mod.ts";

const main = async (args) => {
  const { renderPage, pages, outputDir, srcDir } = await configure(args);

  const dates = Object.keys(pages).sort();

  for (const [date, posts] of Object.entries(pages)) {
    const context = { date: {}, posts };
    const [month, day] = date.split("-");
    // Convert the day to Number to get rid of the leading zero.
    context.date.human = `${monthName(month)} ${+day}`;
    [context.date.prev, context.date.next] = adjacent(dates, date);
    context.messageN = +month + +day;

    Deno.chdir(srcDir);
    const page = await renderPage(context);

    Deno.chdir(outputDir);
    await Deno.mkdir(date, { recursive: true });

    Deno.writeTextFile(
      `${outputDir}/${date}/index.html`,
      page,
      {
        append: false,
        create: true,
      },
    );
  }
};

const configure = async (args) => {
  if (args.length != 2) {
    throw `wrong number of arguments: ${args.length}; expected 2`;
  }
  const [jsonPath, outputDirArg] = args;
  const outputDir = await Deno.realPath(outputDirArg);

  const pages = JSON.parse(await Deno.readTextFile(jsonPath));

  const srcDir = await Deno.realPath(new URL('.', import.meta.url).pathname);

  const templateFile = await Deno.open(`${srcDir}/page.ejs`);
  const renderPage = await dejs.compile(templateFile);
  Deno.close(templateFile.rid);

  return { renderPage, pages, outputDir, srcDir };
};

const adjacent = (xs, x) => {
  const i = xs.indexOf(x);
  if (i === -1) throw `element ${x} not in array`;

  const last = xs.length - 1;
  const prev = i === 0 ? xs[last] : xs[i - 1];
  const next = i === last ? xs[0] : xs[i + 1];

  return [prev, next];
};

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthName = (month) => monthNames[month - 1];

main(Deno.args);
