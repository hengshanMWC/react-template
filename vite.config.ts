import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslintPlugin from 'vite-plugin-eslint'
import { AntdResolve, createStyleImportPlugin } from 'vite-plugin-style-import'
import UnoCSS from 'unocss/vite'

function pathResolve(dir) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
      failOnError: false,
      include: ['src/**/*.js', 'src/**/*.tsx', 'src/**/*.ts'],
    }),
    createStyleImportPlugin({
      resolves: [AntdResolve()],
    }),
    UnoCSS(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
    postcss: {},
  },
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: `${pathResolve('src')}/`,
      },
    ],
  },
  server: {
    proxy: {
      '/admin': 'https://school.web3bay.top',
      '/api': 'https://school.web3bay.top',
    },
  },
})
