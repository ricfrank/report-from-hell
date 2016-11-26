// Karma configuration
var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = {};

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            {pattern: 'spec/**/*Spec.js', watched: false},
        ],


        // list of files to exclude
        exclude: [],

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-webpack',
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            // add webpack as preprocessor
            'spec/**/*Spec.js': ['webpack'],
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            // It suppress error shown in console, so it has to be set to false.
            quiet: false,
            // It suppress everything except error, so it has to be set to false as well
            // to see success build.
            noInfo: false,
            stats: {
                // Config for minimal console.log mess.
                assets: false,
                colors: true,
                version: false,
                hash: false,
                timings: false,
                chunks: false,
                chunkModules: false,
                warnings: false
            },
            //Use this for run watch into a vagrant machine with shared FS
            // watchOptions: {
            //     poll: true
            // }
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['dots'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        autoWatchBatchDelay: 100,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
};
