const inquirer = require("inquirer");
const addNewTemplate = require("./addNewTemplate").cli;

/* eslint-disable no-console */

inquirer
  .prompt([
    {
      type: "list",
      name: "command",
      message: "Operation?",
      choices: ["Add a template", "Quit"]
    }
  ])
  .then(answers => {
    switch (answers.command) {
      case "Add a template":
        addNewTemplate();
        break;
      default:
        console.log("Good bye!");
    }
  });
