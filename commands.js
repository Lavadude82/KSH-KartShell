const { cwd } = require('process');
const { exec } = require('child_process');
const clc = require("cli-color")
const { readdirSync, statSync } = require('fs');
const cmds = [
  {
    name: "exit",
    callback: async () => {
      console.clear();
      process.exit();
    },
  },
  {
    name: "say",
    callback: async (params) => {
      let str = "";
      params.forEach((element) => {
        str += element;
        str += " ";
      });
      console.log(str);
    },
  },
  {
    name: "clear",
    callback: async () => {
      console.clear();
    },
  },
  {
    name: "cd",
    callback: async (params) => {
      if (params.length === 0) {
        console.log("No Directory!");
        return;
      }

      const directoryPath = params[0];

      try {
        process.chdir(directoryPath);
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  {
    name:"",
    callback:async()=>{
    }
  },
  {
    name:"ls",
    callback:async()=>{
        readdirSync(cwd()).forEach((e,i)=>{
            if(require("./config.json").fileBlacklist.includes(e)){
                return;
            }
            if(statSync(cwd() + `\\${e}`).isDirectory()){
                console.log(clc.blue(e))
            }else{
                console.log(e)
            }
        })
    }
  },
 
];

module.exports = {
  cmds,
};
