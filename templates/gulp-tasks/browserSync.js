module.exports = function (gulp, plugins) {
    return function () {
      plugins.browserSync.init({
         open: false,
        server: {
          baseDir: '.tmp'
        },
      })
    }
};
