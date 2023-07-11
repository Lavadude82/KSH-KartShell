const rl = require("readline-sync");
const clc = require("cli-color")
const fs = require("fs");
const { cmds } = require("./commands"); // Import path from the commands module

let decor = "\\ - $ ";
console.clear();
console.log(
  `\n<Kart> Shell - Open Source KSH${clc.redBright('\n\nYOU MAY NOT DISTRIBUTE THIS AT COST!\nTHIS IS FREE AND OPEN-SOURCE!')}`
);

setInterval(async () => {
  let currentPath = process.cwd(); // Store the initial path value

  let input = rl.question(`${clc.green(currentPath)}${clc.blue(decor)}`).split(" ");
  let found = false;
  cmds.forEach((e, i) => {
    if (input[0] == e.name) {
      let temp = input;
      temp.splice(0, 1);
      found = true;
      e.callback(temp);
    }
  });
  if (!found) {
    console.log(`Command '${input[0]}' not found.`);
  }
}, 0);
