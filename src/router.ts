import { argv, stdout, stderr } from 'bun';

import { exit } from 'node:process';

import type { Utils, UtilsInit } from './types';

import { createComponent } from './createComponent';

const utilsInit: UtilsInit = [['cc', createComponent]];
const utils: Utils = new Map(utilsInit);

const commandName = argv[2];

const commandArguments: string[] = argv.slice(3, argv.length);

const command = utils.get(commandName);

if (!command) {
    stderr.write('Command "' + commandName + '" is not defined \n');
    exit(1);
}

const commandExecStart = performance.now();
Promise.resolve(command(...commandArguments))
    .then(() => {
        const commandExecEnd = performance.now();

        stdout.write('Done in ' + (commandExecEnd - commandExecStart) + 'ms');
    })
    .catch((error) => {
        if (error instanceof Error) {
            stderr.write(error.message);
        }
        process.exit(1);
    });
