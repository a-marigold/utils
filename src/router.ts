import { stdin } from 'bun';

import type { Utils, UtilsInit } from './types';

import { COMMAND_START_REGEXP, COMMAND_REGEXP } from './constants';

import { createComponent } from './createComponent';

const utilsInit: UtilsInit = [['cc', createComponent]];

const utils: Utils = new Map(utilsInit);

stdin.text().then((input) => {
    const commands: string[] = [];

    let lastCommandPos : number = 0;

    const inputLength = input.length;

    let pos = 0;

    while (pos < inputLength) {
        if (input[pos] === ' ') {
            pos++;

            continue;
        }

        if (input[pos] === '(') {
            const startPos = pos;

            while(pos < inputLength && pos !==) {}
        }

        if()
    }
});
