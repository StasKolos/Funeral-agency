import eslint from '@ws-serenity/eslint';

const configFileGlobs = ['*.config.{js,mjs,cjs}', 'eslint.config.mjs'];
const nextRuntimeGlobals = {
    process: 'readonly',
};
const nodeGlobals = {
    console: 'readonly',
    module: 'readonly',
    process: 'readonly',
};

export default [
    ...eslint({ next: true }),
    {
        linterOptions: {
            reportUnusedDisableDirectives: 'warn',
        },
    },
    {
        files: ['app/**/*.{ts,tsx}', 'src/**/*.{ts,tsx}'],
        languageOptions: {
            globals: nextRuntimeGlobals,
        },
    },
    {
        files: ['app/api/**/*.{ts,tsx}', ...configFileGlobs],
        languageOptions: {
            globals: nodeGlobals,
        },
    },
    {
        files: configFileGlobs,
        rules: {
            'no-magic-numbers': 'off',
        },
    },
];
