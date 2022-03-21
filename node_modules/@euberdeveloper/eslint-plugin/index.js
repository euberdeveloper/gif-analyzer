'use strict';

const typescript = require('./configurations/typescript');
const unicorn = require('./configurations/unicorn');
const mocha = require('./configurations/mocha');
const prettier = require('./configurations/prettier');

module.exports = {
    configs: {
        typescript,
        unicorn,
        mocha,
        prettier
    }
};