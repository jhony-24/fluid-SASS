#!/usr/bin/env node
const { program } = require("commander");
const package = require("./package.json");
const chalk = require("chalk");
const cliSpinners = require("cli-spinners");
const ora = require("ora");
const spinner = ora({spinner:cliSpinners.dots});
const fs = require("fs");
const fsExtra = require("fs-extra");
const path = require("path");

program.version(package.version,"-v, --version","Version fluid-sass animation");

/**
 * Base directories and main file
 */
const currentDir = __dirname;
const locationModule = [ "" ];
let nameFile = "animations";
const css = "css";
const scss = "scss";

const getFullnameFile = (extension) => nameFile + "." + extension;

const pathJoin = (...location) => path.join(currentDir,...location);

/**
 * All commands to install a file css or scss with diferents options
 */
const commandsInstall = {
    css([dir],callback) {
        fs.copyFile( 
            pathJoin(...locationModule,css,getFullnameFile(css)) , 
            pathJoin(dir,getFullnameFile(css)) , 
            callback
        );
    },
    scss([dir],callback) {
        fsExtra.copy( pathJoin(...locationModule,scss), pathJoin(dir),(error) => {
            if(error) throw new Error(error.message);
            callback();
        })
    }
}
program
.command("install [typeFile]").description("Install a file type css or scss in the project")
.option("-d, --dir <type>","The directory to install")
.action((typeFile,cmd) => {
    if(typeFile in commandsInstall) {
        spinner.start("Installing...");
        commandsInstall[typeFile]([cmd.dir || ""],() => {
            spinner.succeed(chalk.bold.rgb(40,230,100)("Complete"));
        });
    }
    else {
        spinner.fail(chalk.red("Not type file received"));
    }
});

program.parse(process.argv)