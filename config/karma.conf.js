module.exports = function(config) {
    let testWebpackConfig = require('./webpack.test.js')({env: 'test'});
    let configuration = {
        basePath: '',
        frameworks: ['mocha', 'chai'],
        exclude: [],
        files: [{ pattern: './config/spec-bundle.js', watched: false }],
        preprocessors: {'./config/spec-bundle.js': ['webpack']},
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
        webpackMiddleware: {stats: 'errors-only', noInfo: true},
        reporters: ['mocha', 'coverage', 'remap-coverage', 'growl'],
        port: 9876,
        color: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        singleRun: true
    };

    config.set(configuration);
}