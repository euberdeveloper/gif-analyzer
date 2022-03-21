'use strict';

const mochaRules = require('./rules/mochaRules');

module.exports = {
    plugins: ['mocha'],
    rules: Object.assign({},
        mochaRules
    )
};