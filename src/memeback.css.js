const width = 625;
const onDesktop = `@media (min-width: ${width}px)`;
const onMobile = `@media (max-width: ${width - 1}px)`;

const padding = 5;

const text = 20;
const smallerText = 14;

const css = `

body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  max-width: ${width + 2*padding}px;
}

${onDesktop} {
  body {
    margin: 10px auto;
  }
}

${onMobile} {
  body {
    font-size: 16px;
  }
}

header {
  background: black;
  color: white;
  text-align: center;
  padding: ${padding}px 0;
}

header > h1 {
  font-size: 300%;
  font-weight: normal;
  margin: 0;
}

nav {
  display: flex;
  font-size: ${smallerText}px;
  justify-content: space-between;
  margin: ${padding * 3}px 0;
  width: 100%;
}

#prev-day {
  margin-left: 1em;
}

#next-day {
  margin-right: 1em;
}

section > h2 {
  padding-left: ${padding}px;
}

article {
  padding: ${padding}px;
}

article:nth-of-type(odd) {
  background: #ddd;
}

article > .metadata {
  font-size: ${smallerText}px;
  padding-top: ${padding}px;
}

time.date {
  font-weight: bolder;
}

footer {
  padding: ${padding}px 0;
}

footer > * {
  font-size: ${smallerText}px;
  padding: ${padding}px;
  text-align: center;
}

#copyright {
  background: black;
  color: white;
}

`;

console.log(css.trim());
