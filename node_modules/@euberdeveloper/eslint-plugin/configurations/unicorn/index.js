'use strict';

const unicornRules = require('./rules/unicornRules');

module.exports = {
    plugins: ['unicorn'],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    rules: Object.assign({},
        unicornRules
    )
};