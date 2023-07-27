const { cwd } = require('process');
const { exec } = require('child_process');
const clc = require("cli-color")
const { readdirSync, statSync } = require('fs');
const { error } = require('console');
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
      const homeDirectory = process.env.HOME;


      if (params.length === 0) {
        console.log(clc.yellow("W:"),"No Directory!");
        return;
      }

      let directoryPath = params[0].split("");
      let dir = ""
       directoryPath.forEach((e,i)=>{
        if(e == "~"){
          dir += homeDirectory
        }else{
          dir +=  e
        }
       }) 

      try {
        process.chdir(dir);
      } catch (error) {
        console.log(clc.yellow("W:"),"Directory Does Not Exist!");
      }
    },
  },
  {
    name:"",
    callback:async()=>{
    }
  },
  {
    name:"sh",
    callback:async(params)=>{
      let file = params[0];
      if(file == ""){
        return console.log("No File Specified!");
      }
      let sws = false;
      try{
        sws = file.startsWith("/",0);
      }catch(error){
        console.log("File Does Not Exist!")
      }
      let cmd;
      if(sws){
      cmd = exec(`sh ${file}`)

      }else{
      cmd = exec(`sh ${cwd() + file}`)
      }

      cmd.stdout.on("data",(e)=>{
        console.log(e);
      })
    }
  },
  {
    name:"ls",
    callback:async()=>{
        readdirSync(cwd()).forEach((e,i)=>{
          let isDir;
          try{
            isDir = statSync(cwd() + `\\${e}`).isDirectory()
          }catch(err){

          }
            if(isDir){
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
