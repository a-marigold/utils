/**
 *
 *
 *
 *
 * Type of object that is logged in table from `help` command
 */
type HelpUtil = { Name: string; Command: string; Description: string };

const helpUtils: HelpUtil[] = [
    {
        Name: 'createComponent',

        Command: 'cc',

        Description:
            'Creates directory with provided name with two files: - react component `[Name].tsx` and - SCSS module `[Name].module.scss`',
    },
    {
        Name: 'Help',

        Command: 'Help',

        Description: `Outputs all utils`,
    },
];

/**
 *
 *
 *
 *  Help is util to see all the commands
 */
export const help = (): void => {
    console.table(helpUtils);
};
