const mix = require('laravel-mix')

mix.options({
  terser: {
    extractComments: false
  }
})

mix
  .js('src/app.js', 'dist')
  .js('src/options.js', 'dist')
  .css('src/style.css', 'dist')
