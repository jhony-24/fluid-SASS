#!/usr/bin/env node
const { program } = require("commander");
const package = require("./package.json");
const { exec } = require("child_process");
const chalk = require("chalk");
const cliSpinners = require("cli-spinners");
const ora = require("ora");
const spinner = ora({spinner:cliSpinners.dots});

program.version(package.version,"-v, --version","Version fluid-sass animation");

program.command("generate").description("Generate css file build").action(() => {
    spinner.start("Building...");
    exec("npx gulp sass",(error) => {
        if(!error){
            spinner.stop();
            console.log(chalk.bold.rgb(40,230,100)("- COMPLETE: ") + "Build success");
        }
    });
});

program.parse(process.argv);

