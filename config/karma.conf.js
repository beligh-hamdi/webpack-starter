module.exports = function(config) {
    let testWebpackConfig = require('./webpack.test.js')({env: 'test'});
    let configuration = {
        basePath: '',
        frameworks: ['jasmine'],
        exclude: [],
        files: [ { pattern: './config/spec-bundle.js', watched: false } ],
        preprocessors: { './config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap'] },
        browsers: ['PhantomJS'],
        webpack: testWebpackConfig,
        coverageReporter: {
            type: 'in-memory'
        },
        remapCoverageReporter: {
            'text-summary': null,
            json: './coverage/coverage.json',
            html: './coverage/html'
        },
        webpackMiddleware: { stats: 'errors-only'},
        reporters: [ 'mocha', 'coverage', 'remap-coverage' ],
        port: 9876,
        color: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        singleRun: true
    };

    config.set(configuration);
}