'use strict';

module.exports = {
    // Enforce consistent brace style for blocks. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/brace-style.md
    'brace-style': 'off',
    '@typescript-eslint/brace-style': ['error', 'stroustrup'],

    // Require or disallow trailing comma. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-dangle.md
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'never'],

    // Enforces consistent spacing before and after commas. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-spacing.md
    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': ['error'],

    // Enforce default parameters to be last.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/default-param-last.md
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': ['error'],

    // Enforce dot notation whenever possible. Fixable.
    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': ['error'],

    // Require or disallow spacing between function identifiers and their invocations. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/func-call-spacing.md
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': ['error', 'never'],

    // Enforce consistent indentation. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 4],

    // Require or disallow initialization in variable declarations
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/init-declarations.md
    // 'init-declarations': 'off',
    // '@typescript-eslint/init-declarations': ['error'],

    // Enforce consistent spacing before and after keywords. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/keyword-spacing.md
    'keyword-spacing': 'off',
    '@typescript-eslint/keyword-spacing': ['error'],

    // Require or disallow an empty line between class members. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/lines-between-class-members.md
    // 'lines-between-class-members': 'off',
    // '@typescript-eslint/lines-between-class-members': ['error'],

    // Disallow generic Array constructors. Recommended. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-array-constructor.md
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': ['error'],

    // Disallow duplicate class members.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dupe-class-members.md
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': ['error'],

    // Disallow duplicate imports
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-duplicate-imports.md
    // 'no-duplicate-imports': 'off',
    // '@typescript-eslint/no-duplicate-imports': ['error'],

    // Disallow empty functions. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['error'],

    // Disallow unnecessary parentheses. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-parens.md
    // 'no-extra-parens': 'off',
    // '@typescript-eslint/no-extra-parens': ['error'],

    // Disallow unnecessary semicolons. Recommended. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-semi.md
    'no-extra-semi': 'off',
    '@typescript-eslint/no-extra-semi': ['error'],

    // Disallow this keywords outside of classes or class-like objects.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-invalid-this.md
    'no-invalid-this': 'off',
    '@typescript-eslint/no-invalid-this': ['error'],

    // Disallow function declarations that contain unsafe references inside loop statements
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loop-func.md
    'no-loop-func': 'off',
    '@typescript-eslint/no-loop-func': ['error'],

    // Disallow literal numbers that lose precision.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loss-of-precision.md
    'no-loss-of-precision': 'off',
    '@typescript-eslint/no-loss-of-precision': ['error'],

    // Disallow magic numbers.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
    // 'no-magic-numbers': 'off',
    // '@typescript-eslint/no-magic-numbers': ['error'],

    // Disallow variable redeclaration.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-redeclare.md
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],

    // Disallow variable declarations from shadowing variables declared in the outer scope
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md
    // 'no-shadow': 'off',
    // '@typescript-eslint/no-shadow': ['error'],

    // Disallow unused expressions
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md
    // 'no-unused-expressions': 'off',
    // '@typescript-eslint/no-unused-expressions': ['error'],

    // Disallow unused variables. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }],

    // Disallow the use of variables before they are defined
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],

    // Disallow unnecessary constructors
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
    // 'no-useless-constructor': 'off',
    // '@typescript-eslint/no-useless-constructor': ['error'],

    // Enforce the consistent use of either backticks, double, or single quotes. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/quotes.md
    'quotes': 'off',
    '@typescript-eslint/quotes': ['error', 'single', { 'allowTemplateLiterals': true }],

    // Disallow async functions which have no await expression. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-await.md
    'require-await': 'off',
    '@typescript-eslint/require-await': ['error'],

    // Enforces consistent returning of awaited values. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/return-await.md
    // 'no-return-await': 'off',
    // '@typescript-eslint/return-await': 'error',

    // Require or disallow semicolons instead of ASI. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/semi.md
    'semi': 'off',
    '@typescript-eslint/semi': ['error'],

    // Enforces consistent spacing before function parenthesis. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-function-paren.md
    '@typescript-eslint/space-before-function-paren': ['error', {
        'anonymous': 'never',
        'named': 'never',
        'asyncArrow': 'always'
    }]
};