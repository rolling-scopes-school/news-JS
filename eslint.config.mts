import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: {
            ...globals.browser,
            ...globals.node,
        },
    },
    {
        files: ['**/*.{ts,mts,cts}'],
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        rules: {
            '@typescript-eslint/no-explicit-any': 'error',
        },
        languageOptions: {
            globals: globals.browser,
        },
    },
]);
