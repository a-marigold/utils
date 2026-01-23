import { argv, stdout, stderr } from 'bun';

import { exit } from 'node:process';

import type { Utils, UtilsInit } from './types';

import { createComponent } from './createComponent';

import { help } from './help';

const utilsInit: UtilsInit = [
    ['cc', createComponent],
    ['help', help],
];

/**
 *
 *
 *  Map with all utils
 *
 *
 *
 */
export const utils: Utils = new Map(utilsInit);

const commandName = argv[2];

const commandArguments: string[] = argv.slice(3, argv.length);

const command = utils.get(commandName);

if (!command) {
    stderr.write('Command "' + commandName + '" is not defined\n');

    exit(127);
}

const commandExecStart = performance.now();

Promise.resolve(command(...commandArguments))
    .then(() => {
        const commandExecEnd = performance.now();

        stdout.write(
            'Done in \x1b[36m' +
                (commandExecEnd - commandExecStart) +
                'ms\x1b[0m\n',
        );
    })
    .catch((error) => {
        let message = '';

        if (error instanceof Error) {
            message = error.message;
        } else {
            message = 'Unknown error';
        }

        stderr.write('\x1b[31m' + message + '\x1b[0m\n');

        process.exit(1);
    });
