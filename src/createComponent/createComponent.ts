import { mkdir } from 'node:fs/promises';
import { write } from 'bun';

import type { UtilFunction } from '../types';

/**
 *
 * Creates react component directory, component file and CSS module file there.
 *
 * @param name - name of component. For example, `Button`.
 */
export const createComponent: UtilFunction = (
    name: string | undefined
): Promise<(number | void)[]> => {
    if (!name) {
        throw new Error('');
    }

    const componentDirPath = './' + name + '/';

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
            `
            ),

            write(componentDirPath + name + '.module.scss', ''),

            write(
                componentDirPath + 'index.ts',
                'export { default } from "./' + name + '";'
            ),
        ]);
    });
};
