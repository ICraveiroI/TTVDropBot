const winston = require("winston");
const axios = require("axios");
const chalk = require("chalk");

export default async function (version: string) {

    type Data = {
        data: Object
    }

    const url = 'http://144.91.124.143:3004/ttvdropbot-dev';
    //Version server is optional, never block or crash the bot if it is unreachable
    const req = await axios.get(url, {timeout: 10000}).then((data: Data) => {
            return data.data;
        }).catch(() => {
            winston.warn(chalk.yellow("Could not check the version... Skipping"))
            return undefined
    });

    if (req && req.version !== version) {
        winston.silly(" ")
        winston.info(chalk.green("New Version to download available...") + " | " + chalk.gray("Your Version: ") +  chalk.magenta(version + " (main)") + " | " + chalk.gray("Newest Version: ") +  chalk.magenta(req.version))
    }
}