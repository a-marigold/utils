import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { stdout, write } from 'bun';

import type { UtilFunction } from '../types';

/**
 *
 * Creates react component directory, component file and CSS module file there.
 *
 * @param destination - path of directory where new component directory will be created.
 *
 * @param name - name of component. For example, `Button`.
 */
export const createComponent: UtilFunction = (
    destination: string | undefined,

    name: string | undefined,
): Promise<void> => {
    if (!destination && !name) {
        return Promise.reject(
            new Error('Path and Name of component are required'),
        );
    }

    if (!destination) {
        return Promise.reject(new Error('Path is required'));
    }

    if (!name) {
        return Promise.reject(new Error('Name of component is required'));
    }

    const componentDirPath = resolve(destination + '/' + name) + '/';

    return mkdir(componentDirPath).then(
        () => {
            return Promise.all([
                write(
                    componentDirPath + name + '.tsx',
                    'import __COMPONENT_STYLES__ from "./' +
                        name +
                        `.module.scss";

export default function ` +
                        name +
                        `() {
    return <div> </div>;  
}          
            `,
                ),

                write(componentDirPath + name + '.module.scss', ''),

                write(
                    componentDirPath + 'index.ts',
                    'export { default } from "./' + name + '";',
                ),
            ]).then(() => {
                stdout.write(
                    '\x1b[32m+\x1b[0m Component \x1b[1m' +
                        name +
                        '\x1b[0m was created\n',
                );
            });
        },
        (error) => {
            stdout.write(
                '\x1b[1;30;47m tip \x1b[0m \x1b[37mmaybe the path should be wrapped with quotes\x1b[0m\n',
            );

            throw error;
        },
    );
};
