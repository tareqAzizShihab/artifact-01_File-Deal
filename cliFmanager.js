const process = require("process");
const readline = require("readline/promises");
const fs = require("fs/promises");
const { styleText } = require("util");
const constraints = {
  create: "create a file", //Done
  read: "read a file", //Done
  edit: "edit a file", //Done
  copy: "copy a file", //Done
  rename: "rename a file", //Done
  delete: "delete a file", //Done
  move: "move a file", //Done
  createDir: "create a folder", //Done
};

function getValues(string) {
  if (
    string.includes(constraints.create) &&
    string.indexOf(constraints.create.trim()) === 0
  ) {
    const type = "create";
    const path = string.slice(constraints.create.length).trim();
    return {
      type,
      path,
    };
  } else if (
    string.includes(constraints.read) &&
    string.indexOf(constraints.read.trim()) === 0
  ) {
    const type = "read";
    const path = string.slice(constraints.read.length).trim();
    return {
      type,
      path,
    };
  } else if (
    string.includes(constraints.edit) &&
    string.indexOf(constraints.edit.trim()) === 0
  ) {
    const type = "edit";
    const path = string
      .slice(constraints.edit.length, string.indexOf("content"))
      .trim();
    const content = string
      .slice(constraints.edit.length + path.length + 2 + "content".length)
      .trim();
    return {
      type,
      path,
      content,
    };
  } else if (
    string.includes(constraints.copy) &&
    string.indexOf(constraints.copy.trim()) === 0
  ) {
    const type = "copy";
    const path = string
      .slice(constraints.copy.length, string.indexOf("to"))
      .trim();
    const to = string
      .slice(constraints.copy.length + path.length + 2 + "to".length)
      .trim();
    return {
      type,
      path,
      to,
    };
  } else if (
    string.includes(constraints.rename) &&
    string.indexOf(constraints.rename.trim()) === 0
  ) {
    const type = "rename";
    const path = string
      .slice(constraints.rename.length, string.indexOf("to"))
      .trim();
    const to = string
      .slice(constraints.rename.length + path.length + 2 + "to".length)
      .trim();
    return {
      type,
      path,
      to,
    };
  } else if (
    string.includes(constraints.move) &&
    string.indexOf(constraints.move.trim()) === 0
  ) {
    const type = "move";
    const path = string
      .slice(constraints.move.length, string.indexOf("to"))
      .trim();
    const to = string
      .slice(constraints.move.length + path.length + 2 + "to".length)
      .trim();
    return {
      type,
      path,
      to,
    };
  } else if (
    string.includes(constraints.delete) &&
    string.indexOf(constraints.delete.trim()) === 0
  ) {
    const type = "delete";
    const path = string.slice(constraints.delete.length).trim();
    return {
      type,
      path,
    };
  } else if (
    string.includes(constraints.createDir) &&
    string.indexOf(constraints.createDir.trim()) === 0
  ) {
    const type = "createDir";
    const path = string.slice(constraints.createDir.length).trim();
    return {
      type,
      path,
    };
  }
}

async function start() {
  const { stdin: input, stdout: output } = process;

  const rl = readline.createInterface({ input, output });
  try {
    while (true) {
      const command = (await rl.question("fileDeal> ")).trim();
      if (command === "exit") {
        break;
      } else if (!command) {
        console.log(`No command found!`);
      } else {
        const { type, path, to = null, content = null } = getValues(command);
        try {
          switch (type) {
            case "create":
              await fs.writeFile(path, "", { flag: "wx" });
              console.log(
                styleText(["green", "bold"], `File created at ${path}`),
              );
              break;

            case "read":
              const results = await fs.readFile(path);
              console.log(styleText("bold", results.toString("utf-8")));
              break;

            case "edit":
              await fs.writeFile(path, content);
              console.log(
                styleText(
                  ["green", "bold"],
                  `File edited at ${path} with ${content}`,
                ),
              );
              break;

            case "copy":
              await fs.copyFile(path, to);
              console.log(
                styleText(
                  ["green", "bold"],
                  `File copied from ${path} to ${to}`,
                ),
              );
              break;

            case "rename":
              await fs.rename(path, to);
              console.log(
                styleText(
                  ["green", "bold"],
                  `File renamed from ${path} to ${to}`,
                ),
              );
              break;

            case "delete":
              await fs.unlink(path);
              console.log(styleText(["green", "bold"], `File deleted ${path}`));
              break;

            case "move":
              await fs.rename(path, to);
              console.log(
                styleText(
                  ["green", "bold"],
                  `File moved from ${path} to ${to}`,
                ),
              );
              break;

            case "createDir":
              await fs.mkdir(path);
              console.log(
                styleText(["green", "bold"], `Directory created ${path}`),
              );
              break;
            default:
              break;
          }
        } catch (err) {
          if (err.code === "EEXIST") {
            console.log(styleText(["red", "bold"], "File already Exist."));
          } else if (err.code === "ENOENT") {
            console.log(
              styleText(
                ["yellow", "bold"],
                "Desire folder or file is not exist. Try 'create a folder/file' command with proper path.",
              ),
            );
          } else {
            console.log(err);
          }
          continue;
        }
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    console.log("closing...");
    rl.close();
  }
}

start().catch((err) => console.error(err));
