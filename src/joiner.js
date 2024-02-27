import chalk from 'chalk';
import gradient from 'gradient-string';
import * as selfbot from 'discord.js-selfbot-v13';
import fs from 'fs';
import * as proxyAgent from 'https-proxy-agent';

import config from '../config.js';

const tokens = fs.readFileSync('tokens.txt', 'utf-8').toString().split('\n');
const proxies = fs.readFileSync('proxies.txt', 'utf-8').toString().split('\n');

process.on('unhandledRejection', (reason, promise) => console.log(`${chalk.redBright('[ERROR]')} Unhandled rejection at ${promise}, reason: ${reason}`));
process.on('uncaughtException', (err, origin) => console.log(`${chalk.redBright('[ERROR]')} Uncaught exception: ${err} at ${origin}}`));

let joined = 0;
let failed = 0;

let modifiedCode = (config.invite.includes('/')) ? config.invite.match(/\/([^/]+)$/)?.[1] : config.invite;

console.log(gradient.rainbow('Discord Token Joiner!'));
console.log(gradient.rainbow('   > Built by VillainsRule\n'));

async function join(token, tokens) {
    let proxy = proxies[Math.floor(Math.random() * proxies.length)]?.replaceAll('\r', '')?.replaceAll('\n', '');
    let http = {
        agent: new proxyAgent.default.HttpsProxyAgent(proxy)
    };
    let captchaService = config.captchaSolver.service.toLowerCase();
    let captchaKey = config.captchaSolver.apiKey;

    let client = new selfbot.Client({
        captchaService: (config.captchaSolver.enabled) ? captchaService : undefined,
        captchaKey: (config.captchaSolver.enabled) ? captchaKey : undefined,
        http: (config.useProxies) ? http : undefined,
        captchaWithProxy: config.useProxies && config.captchaSolver,
        proxy: (config.useProxies) ? proxy : undefined,
        checkUpdate: false
    });

    client.on('ready', async () => {
        console.log(chalk.green('Logged in as @') + gradient.cristal(client.user.username));

        await client.fetchInvite(modifiedCode).then(async (invite) => {
            await invite.acceptInvite(true).then(async () => {
                console.log(chalk.greenBright(`${chalk.greenBright('[SUCCESS]')} Joined as @${gradient.passion(client.user.username)}`));
                joined++;

                if (client.token === tokens[tokens.length - 1]) {
                    console.log(`${chalk.magentaBright('[INFO]')} Joined ${gradient.passion(joined)} servers and failed to join ${gradient.passion(failed)} servers}`);
                    process.exit(0);
                };
            }).catch((err) => {
                console.log(`${chalk.redBright('[ERROR]')} Failed to join as @${gradient.cristal(client.user.username)}`);
                failed++;

                console.error(chalk.redBright(err));

                if (client.token === tokens[tokens.length - 1]) {
                    console.log(`${chalk.magentaBright('[INFO]')} Joined ${gradient.passion(joined)} servers and failed to join ${gradient.passion(failed)} servers}`);
                    process.exit(0);
                };
            });
        }).catch((err) => {
            console.error(err);
        });
    });

    client.login(token).catch(() => {
        console.log(`${chalk.redBright('[ERROR]')} Invalid token: ${gradient.instagram(token)}`);

        if (client.token === tokens[tokens.length - 1]) {
            console.log(`${chalk.magentaBright('[INFO]')} Joined ${gradient.passion(joined)} servers and failed to join ${gradient.passion(failed)} servers}`);
            process.exit(0);
        };
    });
}

(async () => {
    for (let i in tokens) {
        await new Promise((resolve) => setTimeout(resolve, i * config.joinDelay));
        join(tokens[i]?.trim()?.replace('\r', '')?.replace('\n', ''), tokens);
    };
})();