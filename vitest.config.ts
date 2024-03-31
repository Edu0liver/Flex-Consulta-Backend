import { defineConfig } from 'vitest/config';
import 'reflect-metadata';

export default defineConfig({
    test: {
        globals: true,
        root: './',
    },
});
