const { cwd } = require("process");
const { exec } = require("child_process");
const clc = require("cli-color");
const { readdirSync, statSync, readFileSync, writeFileSync } = require("fs");
const { error } = require("console");
function UpdateConfigValue(path, property, value) {
  let data = JSON.parse(readFileSync(path, "utf-8"));
  data[property] = value;
  writeFileSync(path, JSON.stringify(data, null, 2));
}
const cmds = [
  {
    name: "config",
    callback: async (params) => {
      if (params[0] == "-sm") {
        UpdateConfigValue(
          __dirname + "/config.json",
          "print_default",
          params[1] == "true"
        );
      }
      if (params[0] == "-td") {
        params.splice(0, 1);
        if (params[0] == "$td.def") {
          UpdateConfigValue(
            __dirname + "/config.json",
            "print_decoration",
            "\ -\ $\ "
          );
        } else {
          UpdateConfigValue(
            __dirname + "/config.json",
            "print_decoration",
            " " + params.join(" ") + " "
          );
        }
      }
    },
  },
  {
    name: "exit",
    callback: async (params) => {
      if (params[0] == "--help" || params[0] == "-h") {
        console.log(`--keep or -k : Keeps the terminal`);
        return;
      }
      if (params[0] == "--keep") {
        console.clear();
      }
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
        console.log(clc.yellow("W:"), "No Directory!");
        return;
      }

      let directoryPath = params[0].split("");
      let dir = "";
      directoryPath.forEach((e, i) => {
        if (e == "~") {
          dir += homeDirectory;
        } else {
          dir += e;
        }
      });

      try {
        process.chdir(dir);
      } catch (error) {
        console.log(clc.yellow("W:"), "Directory Does Not Exist!");
      }
    },
  },
  {
    name: "",
    callback: async () => {},
  },
  {
    name: "sh",
    callback: async (params) => {
      let file = params[0];
      if (file == "") {
        return console.log("No File Specified!");
      }
      let sws = false;
      try {
        sws = file.startsWith("/", 0);
      } catch (error) {
        console.log("File Does Not Exist!");
      }
      let cmd;
      if (sws) {
        cmd = exec(`sh ${file}`);
      } else {
        cmd = exec(`sh ${cwd() + file}`);
      }

      cmd.stdout.on("data", (e) => {
        console.log(e);
      });
    },
  },
  {
    name: "ls",
    callback: async () => {
      let str = "";
      readdirSync(cwd()).forEach((e, i) => {
        let isDir;
        try {
          isDir = statSync(cwd() + `/${e}`).isDirectory();
        } catch (err) {}
        const width = process.stdout.columns || defaultColumns;

        if (str.length + e.length + 2 > width) {
          console.log(str);
          str = "";
        }
        if (isDir) {
          str += clc.blue(e) + "  ";
        } else {
          str += e + "  ";
        }
      });
      console.log(str);
    },
  },
];

module.exports = {
  cmds,
};
