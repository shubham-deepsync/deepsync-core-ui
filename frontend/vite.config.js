import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    server: {
        port: 3000,
        strictPort: true,
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                callback: resolve(__dirname, 'auth/callback.html'),
            },
        },
    },
})
