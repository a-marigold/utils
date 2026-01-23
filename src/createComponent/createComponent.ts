import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { write } from 'bun';

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
): Promise<(number | void)[]> => {
    if (!destination || !name) {
        throw new Error('Path and Name are required');
    }

    const componentDirPath = resolve(destination + '/' + name) + '/';

    return mkdir(componentDirPath).then(() => {
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
        ]);
    });
};
