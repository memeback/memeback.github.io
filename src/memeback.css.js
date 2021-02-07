const width = 500;
const onDesktop = `@media (min-width: ${width}px)`;
const onMobile = `@media (max-width: ${width - 1}px)`;

const padding = 4;

const text = 16;
const smallerText = 10;

const textMobile = 20;
const smallerTextMobile = 14;

const css = `

body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: ${text}px;
  max-width: ${width + 2*padding}px;
  margin: 8px auto;
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
  margin-top: ${padding}px;
  padding: ${padding}px;
  text-align: center;
}

#copyright {
  background: black;
  color: white;
}

#source {
  font-weight: bolder;
}

${onMobile} {
  body {
    font-size: ${textMobile};
    margin: 0;
  }

  nav {
    font-size: ${smallerTextMobile}px;
  }

  article > .metadata {
    font-size: ${smallerTextMobile}px;
  }

  footer > * {
    font-size: ${smallerTextMobile}px;
  }

  #source {
    font-weight: normal;
  }
}

`;

console.log(css.trim());
