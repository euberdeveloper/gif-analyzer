'use strict';

module.exports = {
    // Improve regexes by making them shorter, consistent, and safer. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/better-regex.md
    'unicorn/better-regex': ['error'],

    // Enforce a specific parameter name in catch clauses. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/catch-error-name.md
    'unicorn/catch-error-name': ['error'],

    // Use destructured variables over properties. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-destructuring.md
    'unicorn/consistent-destructuring': ['error'],

    // Move function definitions to the highest possible scope. Recommended.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-function-scoping.md
    'unicorn/consistent-function-scoping': ['error'],

    // Enforce correct Error subclassing. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/custom-error-definition.md
    'unicorn/custom-error-definition': ['error'],

    // Enforce correct Error subclassing. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/empty-brace-spaces.md
    // 'unicorn/empty-brace-spaces': ['error'],

    // Enforce passing a message value when creating a built-in error. Recommended.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/error-message.md
    'unicorn/error-message': ['error'],

    // Require escape sequences to use uppercase values. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/escape-case.md
    'unicorn/escape-case': ['error'],

    // Add expiration conditions to TODO comments. Recommended.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/expiring-todo-comments.md
    'unicorn/expiring-todo-comments': ['error'],

    // Enforce explicitly comparing the length property of a value. Recommende. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/explicit-length-check.md
    // 'unicorn/explicit-length-check': ['error'],

    // Enforce a case style for filenames. Recommended.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md
    "unicorn/filename-case": [
        'error',
        {
            cases: {
                kebabCase: true,
                camelCase: true,
                pascalCase: true
            }
        }
    ],

    // Enforce importing index files with '.'. Fixable
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/import-index.md
    'unicorn/import-index': ['error'],

    // Enforce specific import styles per module. Recommended.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/import-style.md
    // 'unicorn/import-style': ['error'],

    // Enforce the use of new for all builtins, except String, Number, Boolean, Symbol and BigInt. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/new-for-builtins.md
    'unicorn/new-for-builtins': ['error'],

    // Enforce specifying rules to disable in eslint-disable comments. Recommended.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-abusive-eslint-disable.md
    'unicorn/no-abusive-eslint-disable': ['error'],

    // Prevent passing a function reference directly to iterator methods. Recommended.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-callback-reference.md
    'unicorn/no-array-callback-reference': ['error'],

    // Prefer for…of over Array#forEach(…). Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-for-each.md
    'unicorn/no-array-for-each': ['error'],

    // Enforce combining multiple Array#push() into one call. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-push-push.md
    'unicorn/no-array-push-push': ['error'],

    // Disallow Array#reduce() and Array#reduceRight(). Recommended.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-reduce.md
    // 'unicorn/no-array-reduce': ['error'],

    // Do not use leading/trailing space between console.log parameters. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-console-spaces.md
    'unicorn/no-console-spaces': ['error'],

    // Do not use a for loop that can be replaced with a for-of loop. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-for-loop.md
    'unicorn/no-for-loop': ['error'],

    // Enforce the use of Unicode escapes instead of hexadecimal escapes. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-hex-escape.md
    'unicorn/no-hex-escape': ['error'],

    // Require Array.isArray() instead of instanceof Array. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-instanceof-array.md
    'unicorn/no-instanceof-array': ['error'],

    // Disallow identifiers starting with new or class.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-keyword-prefix.md
    // 'unicorn/no-keyword-prefix': ['error'],

    // Disallow if statements as the only statement in if blocks without else. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-lonely-if.md
    'unicorn/no-lonely-if': ['error'],

    // Disallow nested ternary expressions. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-nested-ternary.md
    // 'unicorn/no-nested-ternary': ['error'],

    // Disallow new Array(). Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-new-array.md
    // 'unicorn/no-new-array': ['error'],

    // Enforce the use of Buffer.from() and Buffer.alloc() instead of the deprecated new Buffer(). Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-new-buffer.md
    'unicorn/no-new-buffer': ['error'],

    // Disallow the use of the null literal. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-null.md
    // 'unicorn/no-null': ['error'],

    // Disallow the use of objects as default parameters. Recommended.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-object-as-default-parameter.md
    // 'unicorn/no-object-as-default-parameter': ['error'],

    // Disallow process.exit(). Recommended.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-process-exit.md
    'unicorn/no-process-exit': ['error'],

    // Forbid classes that only have static members. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-static-only-class.md
    'unicorn/no-static-only-class': ['error'],

    // Disallow assigning this to a variable. Recommended.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-this-assignment.md
    'unicorn/no-this-assignment': ['error'],

    // Disallow unreadable array destructuring. Recommende. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unreadable-array-destructuring.md
    'unicorn/no-unreadable-array-destructuring': ['error'],

    // Disallow unsafe regular expressions.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unsafe-regex.md
    // 'unicorn/no-unsafe-regex': ['error'],

    // Disallow unused object properties.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unused-properties.md
    // 'unicorn/no-unused-properties': ['error'],

    // Disallow useless undefined. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-undefined.md
    'unicorn/no-useless-undefined': ['error'],

    // Disallow number literals with zero fractions or dangling dots. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-zero-fractions.md
    'unicorn/no-zero-fractions': ['error'],

    // Enforce proper case for numeric literals. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/number-literal-case.md
    'unicorn/number-literal-case': ['error'],

    // Enforce the style of numeric separators by correctly grouping digits. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/numeric-separators-style.md
    'unicorn/numeric-separators-style': ['error'],

    // Prefer .addEventListener() and .removeEventListener() over on-functions. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-add-event-listener.md
    'unicorn/prefer-add-event-listener': ['error'],

    // Prefer .find(…) over the first element from .filter(…). Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-find.md
    'unicorn/prefer-array-find': ['error'],

    // Prefer .flatMap(…) over .map(…).flat(). Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat.md
    'unicorn/prefer-array-flat': ['error'],

    // Prefer Array#flat() over legacy techniques to flatten arrays. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat-map.md
    'unicorn/prefer-array-flat-map': ['error'],

    // Prefer Array#indexOf() over Array#findIndex() when looking for the index of an item. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-index-of.md
    'unicorn/prefer-array-index-of': ['error'],

    // Prefer .some(…) over .find(…). Recommended.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-some.md
    'unicorn/prefer-array-some': ['error'],

    // Prefer Date.now() to get the number of milliseconds since the Unix Epoch. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-date-now.md
    'unicorn/prefer-date-now': ['error'],

    // Prefer default parameters over reassignment. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-default-parameters.md
    'unicorn/prefer-default-parameters': ['error'],

    // Prefer Node#append() over Node#appendChild(). Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-append.md
    'unicorn/prefer-dom-node-append': ['error'],

    // Prefer using .dataset on DOM elements over .setAttribute(…). Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-dataset.md
    'unicorn/prefer-dom-node-dataset': ['error'],

    // Prefer childNode.remove() over parentNode.removeChild(childNode). Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-remove.md
    'unicorn/prefer-dom-node-remove': ['error'],

    // Prefer .textContent over .innerText. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-text-content.md
    'unicorn/prefer-dom-node-text-content': ['error'],

    // Prefer .includes() over .indexOf() and Array#some() when checking for existence or non-existence. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-includes.md
    'unicorn/prefer-includes': ['error'],

    // Prefer KeyboardEvent#key over KeyboardEvent#keyCode. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-keyboard-event-key.md
    'unicorn/prefer-keyboard-event-key': ['error'],

    // Enforce the use of Math.trunc instead of bitwise operators. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-math-trunc.md
    'unicorn/prefer-math-trunc': ['error'],

    // Prefer .before() over .insertBefore(), .replaceWith() over .replaceChild(), prefer one of .before(), .after(), .append() or .prepend() over insertAdjacentText() and insertAdjacentElement(). Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-modern-dom-apis.md
    'unicorn/prefer-modern-dom-apis': ['error'],

    // Prefer negative index over .length - index for {String,Array,TypedArray}#slice() and Array#splice(). Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-negative-index.md
    'unicorn/prefer-negative-index': ['error'],

    // Prefer Number static properties over global ones. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-number-properties.md
    'unicorn/prefer-number-properties': ['error'],

    // Prefer omitting the catch binding parameter. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-optional-catch-binding.md
    'unicorn/prefer-optional-catch-binding': ['error'],

    // Prefer .querySelector() over .getElementById(), .querySelectorAll() over .getElementsByClassName() and .getElementsByTagName(). Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-query-selector.md
    'unicorn/prefer-query-selector': ['error'],

    // Prefer Reflect.apply() over Function#apply(). Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-reflect-apply.md
    'unicorn/prefer-reflect-apply': ['error'],

    // Prefer RegExp#test() over String#match() and RegExp#exec(). Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-regexp-test.md
    'unicorn/prefer-regexp-test': ['error'],

    // Prefer Set#has() over Array#includes() when checking for existence or non-existence. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-set-has.md
    'unicorn/prefer-set-has': ['error'],

    // Prefer the spread operator over Array.from(…), Array#concat(…) and Array#slice(). Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-spread.md
    'unicorn/prefer-spread': ['error'],

    // Prefer String#replaceAll() over regex searches with the global flag. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-replace-all.md
    'unicorn/prefer-string-replace-all': ['error'],

    // Prefer String#slice() over String#substr() and String#substring(). Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-slice.md
    'unicorn/prefer-string-slice': ['error'],

    // Prefer String#startsWith() & String#endsWith() over RegExp#test(). Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-starts-ends-with.md
    'unicorn/prefer-string-starts-ends-with': ['error'],

    // Prefer String#trimStart() / String#trimEnd() over String#trimLeft() / String#trimRight(). Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-trim-start-end.md
    'unicorn/prefer-string-trim-start-end': ['error'],

    // Prefer ternary expressions over simple if-else statements. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-ternary.md
    'unicorn/prefer-ternary': ['error'],

    // Enforce throwing TypeError in type checking conditions. Recommended. Fixable
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-type-error.md
    'unicorn/prefer-type-error': ['error'],

    // Prevent abbreviations. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md
    // 'unicorn/prevent-abbreviations': ['error'],

    // Enforce better string content. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/string-content.md
    // 'unicorn/string-content': ['error'],

    // Require new when throwing an error. Recommended. Fixable.
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/throw-new-error.md
    'unicorn/throw-new-error': ['error']
};