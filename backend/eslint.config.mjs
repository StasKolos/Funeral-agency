import eslint from '@ws-serenity/eslint';

const configFileGlobs = ['*.config.{js,mjs,cjs}', 'eslint.config.mjs'];
const nodeGlobals = {
    Buffer: 'readonly',
    console: 'readonly',
    module: 'readonly',
    process: 'readonly',
    setTimeout: 'readonly',
};

export default [
    ...eslint(),
    {
        settings: {
            react: {
                version: '19.0',
            },
        },
    },
    {
        linterOptions: {
            reportUnusedDisableDirectives: 'warn',
        },
    },
    {
        files: ['src/**/*.ts', ...configFileGlobs],
        languageOptions: {
            globals: nodeGlobals,
        },
    },
    {
        files: ['src/main.ts'],
        rules: {
            'no-magic-numbers': ['warn', { ignore: [-1, 0, 1, 2, 100, 3000] }],
        },
    },
    {
        files: configFileGlobs,
        rules: {
            'no-magic-numbers': 'off',
        },
    },
];
