const css = `
body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  margin: 0 auto;
  width: 620px;
}

header {
  background: black;
  color: white;
  text-align: center;
}

header > h1 {
  font-size: 300%;
  font-weight: normal;
  margin: 0;
}

nav {
  display: flex;
  font-size: 62.5%;
  justify-content: space-between;
  width: 100%;
}

#prev-day {
  margin-left: 1em;
}

#next-day {
  margin-right: 1em;
}

article {
  padding: 4px;
}

article:nth-of-type(odd) {
  background: #ddd;
}

time.date {
  font-weight: bolder;
}

footer {
  font-size: 62.5%;
}

#copyright {
  background: black;
  color: white;
}
`;

console.log(css.trim());
