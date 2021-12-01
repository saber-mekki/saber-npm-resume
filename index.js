#!/usr/bin/env node
"use strict";

import inquirer from "inquirer";
import chalk from "chalk";
import { readFile } from "fs/promises";

const resume = JSON.parse(
  await readFile(new URL("./resume.json", import.meta.url))
);
var response = chalk.bold.green;

var resumePrompts = {
  type: "list",
  name: "resumeOptions",
  message: "What do you want to know about me?",
  choices: [...Object.keys(resume), "Exit"],
};

function main() {
  console.log("Hello,My name is Saber Mekki and welcome to my resume");
  resumeHandler();
}

function resumeHandler() {
  inquirer.prompt(resumePrompts).then((answer) => {
    if (answer.resumeOptions == "Exit") {
      console.log("Let me know if you need anything else");
      console.log(
        chalk.bold.greenBright(
          "If you need any help or advice, please do not hesitate to call me"
        )
      );
      console.log(chalk.cyan.italic("Goodbye"));
      return;
    }
    var option = answer.resumeOptions;
    console.log(response("--------------------------------------"));
    resume[`${option}`].forEach((info) => {
      console.log(response("|   => " + info));
    });
    console.log(response("--------------------------------------"));
    // console.log(resume[`${option}`]);
    inquirer
      .prompt({
        type: "list",
        name: "exitBack",
        message: "Go back or Exit?",
        choices: ["Back", "Exit"],
      })
      .then((choice) => {
        if (choice.exitBack == "Back") {
          console.clear();
          resumeHandler();
        } else {
          return;
        }
      });
  });
}

main();
