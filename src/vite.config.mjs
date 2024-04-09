import { defineConfig } from 'vite'
import commonjs from 'vite-plugin-commonjs'

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: [
        '/app.js',
        '/options.js'
      ],
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    },
    emptyOutDir: false
  },
  plugins: [
    commonjs()
  ]
})
