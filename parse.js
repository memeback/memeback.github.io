// usage: deno run parse.js < file.html > file.json

import jsdom from "https://dev.jspm.io/jsdom";
import "https://unpkg.com/sprintf-js@1.1.2/src/sprintf.js";

const main = async () => {
  const html = new TextDecoder().decode(await Deno.readAll(Deno.stdin));
  const dom = new jsdom.JSDOM(html);

  const tables = Array.from(dom.window.document.querySelectorAll("table"));

  // The first three and the last two tables are not entries.
  const timeline = tables
    .slice(3, tables.length - 2)
    .reduce(parseEntry, { entries: [], prevDate: null })
    .entries
    .reverse();

  console.log(JSON.stringify(timeline));
};

const parseEntry = (acc, entry) => {
  const q = (sel) => entry.querySelector(sel);

  // Entries only carry a date if it is different from the previous.
  const date = parseDate(q) || acc.prevDate;
  acc.prevDate = date;

  const [content, subject, author] = parseContent(q);
  const newWaybackDate = sprintf(
    "https://web.archive.org/web/%u%02u%02u120000",
    ...date,
  );
  const contentWithNewWaybackDate = content
    .replace(/https:\/\/web.archive.org\/web\/\d{14}/g, newWaybackDate);

  acc.entries.push({
    date,
    content: contentWithNewWaybackDate,
    subject,
    author,
  });
  return acc;
};

const parseDate = (q) => {
  const td = q("tbody > tr > td:nth-of-type(1)");

  // JSDOM does not provide innerText.
  const match = td
    .innerHTML
    .match(/>([A-Za-z]+?)&nbsp;(\d+?),&nbsp;(\d+)/);

  if (!match) return null;
  const [_, monthText, day, year] = match;

  return [year, monthNum(monthText), day];
};

const parseContent = (q) => {
  const tdf = q("tbody > tr > td:nth-of-type(2) > font");

  const [_, content] = tdf.innerHTML.match(/^(.*)\n?<br\/?>\w*<font size=/s);

  const subject = tdf
    .querySelector("font > font > a:nth-of-type(1)")
    .innerHTML;

  const author = tdf
    .querySelector("font > font > a:nth-of-type(2)")
    .innerHTML;

  return [content, subject, author];
};

const months = {
  "Jan": 1,
  "January": 1,
  "Feb": 2,
  "February": 2,
  "Mar": 3,
  "March": 3,
  "Apr": 4,
  "April": 4,
  "May": 5,
  "Jun": 6,
  "June": 6,
  "Jul": 7,
  "July": 7,
  "Aug": 8,
  "August": 8,
  "Sep": 9,
  "September": 9,
  "Oct": 10,
  "October": 10,
  "Nov": 11,
  "November": 11,
  "Dec": 12,
  "December": 12,
};

const monthNum = (monthText) => {
  if (months.hasOwnProperty(monthText)) return months[monthText];
  throw `Unknown month: "${monthText}"`;
};

main();
