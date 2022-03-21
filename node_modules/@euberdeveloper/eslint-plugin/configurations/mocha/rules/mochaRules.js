'use strict';

module.exports = {
    // Enforces handling of callbacks for async tests. Recommended.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/c52c1555ad4ce9b2f85373abff2126f63fbd1c53/docs/rules/handle-done-callback.md
    "mocha/handle-done-callback": ["error", {"ignoreSkipped": true}],

    // Limit the number of top-level suites in a single file. Recommended.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/c52c1555ad4ce9b2f85373abff2126f63fbd1c53/docs/rules/max-top-level-suites.md
    // "mocha/max-top-level-suites": ['error'],

    // Disallow async functions passed to describe. Recommended. Fixable.
    // https://github.com/euberdeveloper/eslint-config-typescript
    'mocha/no-async-describe': ['error'],

    // Disallow exclusive mocha tests. Recommended.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/c52c1555ad4ce9b2f85373abff2126f63fbd1c53/docs/rules/no-exclusive-tests.md
    'mocha/no-exclusive-tests': ['error'],

    // Disallow exports from test files. Recommended.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/c52c1555ad4ce9b2f85373abff2126f63fbd1c53/docs/rules/no-exports.md
    // 'mocha/no-exports': ['error'],

    // Disallow global tests. Recommended.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/c52c1555ad4ce9b2f85373abff2126f63fbd1c53/docs/rules/no-global-tests.md
    // 'mocha/no-hooks': ['error'],

    // Disallow hooks for a single test or test suite. Recommended.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/c52c1555ad4ce9b2f85373abff2126f63fbd1c53/docs/rules/no-hooks-for-single-case.md
    'mocha/no-hooks-for-single-case': ['error'],

    // Disallow identical titles. Recommended.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/c52c1555ad4ce9b2f85373abff2126f63fbd1c53/docs/rules/no-identical-title.md
    'mocha/no-identical-title': ['error'],

    // Disallow arrow functions as arguments to mocha globals. Recommended. Fixable.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/c52c1555ad4ce9b2f85373abff2126f63fbd1c53/docs/rules/no-mocha-arrows.md
    'mocha/no-mocha-arrows': ['error'],

    // Disallow tests to be nested within other tests. Recommended.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/c52c1555ad4ce9b2f85373abff2126f63fbd1c53/docs/rules/no-nested-tests.md
    'mocha/no-nested-tests': ['error'],

    // Disallow pending/unimplemented mocha tests. Recommended.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/c52c1555ad4ce9b2f85373abff2126f63fbd1c53/docs/rules/no-pending-tests.md
    'mocha/no-pending-tests': ['error'],

    // Disallow returning in a test or hook function that uses a callback. Recommended.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/c52c1555ad4ce9b2f85373abff2126f63fbd1c53/docs/rules/no-return-and-callback.md
    'mocha/no-return-and-callback': ['error'],

    // Disallow returning from an async test or hook.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/c52c1555ad4ce9b2f85373abff2126f63fbd1c53/docs/rules/no-return-from-async.md
    // 'mocha/no-return-from-async': ['error'],

    // Disallow calling functions and dot operators directly in describe blocks. Recommended.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/c52c1555ad4ce9b2f85373abff2126f63fbd1c53/docs/rules/no-setup-in-describe.md
    // 'mocha/no-setup-in-describe': ['error'],

    // Disallow duplicate uses of a hook at the same level inside a describe. Recommended.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/c52c1555ad4ce9b2f85373abff2126f63fbd1c53/docs/rules/no-sibling-hooks.md
    'mocha/no-sibling-hooks': ['error'],

    // Disallow skipped mocha tests. Recommended.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/c52c1555ad4ce9b2f85373abff2126f63fbd1c53/docs/rules/no-skipped-tests.md
    // 'mocha/no-skipped-tests': ['error'],

    // Disallow synchronous tests.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/c52c1555ad4ce9b2f85373abff2126f63fbd1c53/docs/rules/no-synchronous-tests.md
    // 'mocha/no-synchronous-tests': ['error'],

    // Disallow top-level hooks. Recommended.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/c52c1555ad4ce9b2f85373abff2126f63fbd1c53/docs/rules/no-top-level-hooks.md
    'mocha/no-top-level-hooks': ['error'],

    // Prefer arrow function callbacks (mocha-aware). Fixable.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/c52c1555ad4ce9b2f85373abff2126f63fbd1c53/docs/rules/prefer-arrow-callback.md
    'mocha/prefer-arrow-callback': ['error'],

    // Match suite descriptions against a pre-configured regular expression.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/c52c1555ad4ce9b2f85373abff2126f63fbd1c53/docs/rules/valid-suite-description.md
    // 'mocha/valid-suite-description': ['error'],

    // Match test descriptions against a pre-configured regular expression.
    // https://github.com/lo1tuma/eslint-plugin-mocha/blob/c52c1555ad4ce9b2f85373abff2126f63fbd1c53/docs/rules/valid-test-description.md
    // 'mocha/valid-test-description': ['error']
};