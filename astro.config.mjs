// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import dotenv from 'dotenv';

dotenv.config();

// https://astro.build/config
export default defineConfig({
    integrations: [vue()],
    vite: {
        define: {
            'import.meta.env.VITE_NASA_API_KEY': JSON.stringify(process.env.VITE_NASA_API_KEY)
        }
    }
});