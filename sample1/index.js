// const json = require("./sample.json");

(async () => {
  const url = "https://pokeapi.co/api/v2/pokemon-species/aegislash";
  const response = await fetch(url);
  const data = await response.json();

  const result = data.flavor_text_entries.map((obj) => obj.language);
  console.log(result);
})();

// node.exe index.js > items.txt
// sort
// delete duplicate
