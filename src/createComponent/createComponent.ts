import { mkdir } from 'node:fs/promises';
import { write } from 'bun';

/**
 *
 * Creates react component directory, component file, CSS module file there.
 *
 * @param path - path of new component directory. For example, `./`.
 *
 * @param name - name of component. For example, `Button`.
 */
export const createComponent = (name: string): Promise<(number | void)[]> => {
    const componentDirPath = './' + name + '/';

    return mkdir(componentDirPath).then(() => {
        return Promise.all([
            write(
                componentDirPath + name + '.tsx',
                'import __COMPONENT_STYLES__ from "./' +
                    name +
                    `.module.scss";'
export default function` +
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
