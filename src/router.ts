import { stdin, stdout, stderr } from 'bun';

import type { Utils, UtilsInit } from './types';
import { COMMAND_START_REGEXP, COMMAND_REGEXP } from './constants';

import { createComponent } from './createComponent';

const utilsInit: UtilsInit = [['cc', createComponent]];

const utils: Utils = new Map(utilsInit);

stdin
    .text()
    .then((input) => {
        let commandName = '';

        const commandArguments: string[] = [];

        const inputLength = input.length;

        let pos = 0;

        main: while (pos < inputLength) {
            if (input[pos] === ' ') {
                pos++;

                continue main;
            }

            if (COMMAND_START_REGEXP.test(input[pos])) {
                const startPos = pos;

                while (pos < inputLength && COMMAND_REGEXP.test(input[pos])) {
                    pos++;
                }

                const identifier = input.slice(startPos, pos);
                if (utils.has(identifier)) {
                    commandName = identifier;
                } else {
                    commandArguments.push(identifier);
                }

                pos++;

                continue main;
            }

            throw new Error('Unexpected symbol in standard input string');
        }

        const command = utils.get(commandName);

        if (!command) {
            throw new Error('Command "' + commandName + '" is not defined');
        }

        return command(...commandArguments);
    })
    .catch((error) => {
        if (error instanceof Error) {
            stderr.write(error.message);
        }
    });
