'use strict';

module.exports = {
    // Require that member overloads be consecutive. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/adjacent-overload-signatures.md
    '@typescript-eslint/adjacent-overload-signatures': ['error'],

    // Requires using either T[] or Array<T> for arrays. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md
    '@typescript-eslint/array-type': ['error'],

    // Disallows awaiting a value that is not a Thenable. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/await-thenable.md
    '@typescript-eslint/await-thenable': ['error'],

    // Bans // @ts-<directive> comments from being used or requires descriptions after directive. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-ts-comment.md
    '@typescript-eslint/ban-ts-comment': ['error'],

    // Bans // tslint:<rule-flag> comments from being used. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-tslint-comment.md
    '@typescript-eslint/ban-tslint-comment': ['error'],

    // Bans specific types from being used. Recommended. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-types.md
    '@typescript-eslint/ban-types': ['error'],

    // Ensures that literals on classes are exposed in a consistent style. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/class-literal-property-style.md
    // '@typescript-eslint/class-literal-property-style': 'error',

    // Enforce or disallow the use of the record type. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-indexed-object-style.md
    // '@typescript-eslint/consistent-indexed-object-style': 'error',

    // Enforces consistent usage of type assertions
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-assertions.md
    // '@typescript-eslint/consistent-type-assertions': 'error',

    // Consistent with type definition either interface or type. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-definitions.md
    // '@typescript-eslint/consistent-type-definitions': 'error',

    // Enforces consistent usage of type imports. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/consistent-type-imports.md
    // '@typescript-eslint/consistent-type-imports': 'error',

    // Require explicit return types on functions and class methods.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
    // '@typescript-eslint/explicit-function-return-type': 'error',

    // Require explicit accessibility modifiers on class properties and methods. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-member-accessibility.md
    '@typescript-eslint/explicit-member-accessibility': ['error', {
        accessibility: 'explicit',
        overrides: {
            accessors: 'no-public',
            constructors: 'no-public',
            methods: 'explicit',
            properties: 'explicit',
            parameterProperties: 'explicit'
        }
    }],

    // Require explicit return and argument types on exported functions' and classes' public class methods Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.md
    '@typescript-eslint/explicit-module-boundary-types': ['error', {
        allowArgumentsExplicitlyTypedAsAny: true,
        allowDirectConstAssertionInArrowFunctions: true,
        allowedNames: [],
        allowHigherOrderFunctions: true,
        allowTypedFunctionExpressions: true,
    }],

    // Require a specific member delimiter style for interfaces and type literals. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-delimiter-style.md
    '@typescript-eslint/member-delimiter-style': ['error'],

    // Require a consistent member declaration order
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/member-ordering.md
    '@typescript-eslint/member-ordering': ['error', {
        default: [
            'signature',

            'static-field',
            'decorated-field',
            'instance-field',
            'abstract-field',

            'constructor',

            'static-method',
            'decorated-method',
            'instance-method',
            'abstract-method'
        ]
    }],

    // Enforces using a particular method signature syntax. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/method-signature-style.md
    // '@typescript-eslint/method-signature-style': 'error',

    // Enforces naming conventions for everything across a codebase
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
    '@typescript-eslint/naming-convention': ['error',
        {
            selector: 'default',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
        },
        {
            selector: 'variable',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
        },
        {
            selector: 'variable',
            modifiers: ['const'],
            format: ['camelCase', 'UPPER_CASE'],
            leadingUnderscore: 'allow',
            trailingUnderscore: 'allow',
        },
        {
            selector: 'classProperty',
            modifiers: ['static'],
            format: ['camelCase', 'UPPER_CASE']
        },
        {
            selector: 'typeLike',
            format: ['PascalCase'],
        },
        {
            selector: 'enumMember',
            format: ['UPPER_CASE'],
        }
    ],

    // Requires that .toString() is only called on objects which provide useful information when stringified
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-base-to-string.md
    // '@typescript-eslint/no-base-to-string': 'error',

    // Disallow non-null assertion in locations that may be confusing. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-confusing-non-null-assertion.md
    // '@typescript-eslint/no-confusing-non-null-assertion': 'error',

    // Disallow the delete operator with computed key expressions. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dynamic-delete.md
    // '@typescript-eslint/no-dynamic-delete': 'error',

    // Disallow the declaration of empty interfaces. Recommended. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-interface.md
    '@typescript-eslint/no-empty-interface': ['error'],

    // Disallow usage of the any type. Recommended. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md
    // '@typescript-eslint/no-explicit-any': 'error',

    // Disallow extra non-null assertion. Recommended. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-non-null-assertion.md
    '@typescript-eslint/no-extra-non-null-assertion': ['error'],

    // Forbids the use of classes as namespaces.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extraneous-class.md
    '@typescript-eslint/no-extraneous-class': ['error'],

    // Requires Promise-like values to be handled appropriately. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-floating-promises.md
    '@typescript-eslint/no-floating-promises': ['error', {
        ignoreVoid: true,
        ignoreIIFE: true
    }],

    // Disallow iterating over an array with a for-in loop. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-for-in-array.md
    '@typescript-eslint/no-for-in-array': ['error'],

    // Disallow usage of the implicit any type in catch clauses. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implicit-any-catch.md
    // '@typescript-eslint/no-implicit-any-catch': 'error',

    // Disallow the use of eval()-like methods. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implied-eval.md
    'no-implied-eval': 'off',
    '@typescript-eslint/no-implied-eval': ['error'],

    // Disallows explicit type declarations for variables or parameters initialized to a number, string, or boolean. Recommended. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-inferrable-types.md
    '@typescript-eslint/no-inferrable-types': ['error'],

    // Disallows usage of void type outside of generic or return types
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-invalid-void-type.md
    '@typescript-eslint/no-invalid-void-type': ['error'],

    // Enforce valid definition of new and constructor. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-misused-new.md
    '@typescript-eslint/no-misused-new': ['error'],

    // Avoid using promises in places not designed to handle them. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-misused-promises.md
    '@typescript-eslint/no-misused-promises': ['error'],

    // Disallow the use of custom TypeScript modules and namespaces. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-namespace.md
    '@typescript-eslint/no-namespace': ['error'],

    // Disallows using a non-null assertion after an optional chain expression. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-asserted-optional-chain.md
    '@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],

    // Disallows non-null assertions using the ! postfix operator. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-non-null-assertion.md
    // '@typescript-eslint/no-non-null-assertion': 'error',

    // Disallow the use of parameter properties in class constructors.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-parameter-properties.md
    // '@typescript-eslint/no-parameter-properties': 'error',

    // Disallows invocation of require().
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-require-imports.md
    '@typescript-eslint/no-require-imports': ['error'],

    // Disallow aliasing this. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-this-alias.md
    '@typescript-eslint/no-this-alias': ['error', { 'allowedNames': ['self'] }],

    // Disallow throwing literals as exceptions.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md
    '@typescript-eslint/no-throw-literal': ['error'],

    // Disallow the use of type aliases.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-type-alias.md
    // '@typescript-eslint/no-type-alias': 'error',

    // Flags unnecessary equality comparisons against boolean literals. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-boolean-literal-compare.md
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['error'],

    // Prevents conditionals where the type is always truthy or always falsy. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-condition.md
    '@typescript-eslint/no-unnecessary-condition': ['error'],

    // errors when a namespace qualifier is unnecessary. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-qualifier.md
    '@typescript-eslint/no-unnecessary-qualifier': ['error'],

    // Enforces that type arguments will not be used if not required. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-type-arguments.md
    // '@typescript-eslint/no-unnecessary-type-arguments': 'error',

    // errors if a type assertion does not change the type of an expression. Recommended. Fixable
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unnecessary-type-assertion.md
    '@typescript-eslint/no-unnecessary-type-assertion': ['error'],

    // Disallows assigning any to variables and properties. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-assignment.md
    // '@typescript-eslint/no-unsafe-assignment': 'error',

    // Disallows calling an any type value. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-call.md
    // '@typescript-eslint/no-unsafe-call': 'error',

    // Disallows member access on any typed variables. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-member-access.md
    // '@typescript-eslint/no-unsafe-member-access': 'error',

    // Disallows returning any from a function. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unsafe-return.md
    // '@typescript-eslint/no-unsafe-return': 'error',

    // Disallows the use of require statements except in import statements. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-var-requires.md
    '@typescript-eslint/no-var-requires': ['error'],

    // Prefer usage of as const over literal type. Recommended. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-as-const.md
    '@typescript-eslint/prefer-as-const': ['error'],

    // Prefer initializing each enums member value.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-enum-initializers.md
    // '@typescript-eslint/prefer-enum-initializers': 'error',

    // Prefer a ‘for-of’ loop over a standard ‘for’ loop if the index is only used to access the array being iterated.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-for-of.md
    '@typescript-eslint/prefer-for-of': ['error'],

    // Use function types instead of interfaces with call signatures. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-function-type.md
    // '@typescript-eslint/prefer-function-type': 'error',

    // Enforce includes method over indexOf method. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-includes.md
    '@typescript-eslint/prefer-includes': ['error'],

    // Require that all enum members be literal values to prevent unintended enum member name shadow issues.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-literal-enum-member.md
    '@typescript-eslint/prefer-literal-enum-member': ['error'],

    // Require the use of the namespace keyword instead of the module keyword to declare custom TypeScript modules. Recommended. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-namespace-keyword.md
    '@typescript-eslint/prefer-namespace-keyword': ['error'],

    // Enforce the usage of the nullish coalescing operator instead of logical chaining
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-nullish-coalescing.md
    '@typescript-eslint/prefer-nullish-coalescing': ['error'],

    // Prefer using concise optional chain expressions instead of chained logical ands.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-optional-chain.md
    '@typescript-eslint/prefer-optional-chain': ['error'],

    // Requires that private members are marked as readonly if they're never modified outside of the constructor. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-readonly.md
    '@typescript-eslint/prefer-readonly': ['error'],

    // Requires that function parameters are typed as readonly to prevent accidental mutation of inputs.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-readonly-parameter-types.md
    // '@typescript-eslint/prefer-readonly-parameter-types': 'error',

    // Prefer using type parameter when calling Array#reduce instead of casting. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-reduce-type-parameter.md
    '@typescript-eslint/prefer-reduce-type-parameter': ['error'],

    // Enforce that RegExp#exec is used instead of String#match if no global flag is provided. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-regexp-exec.md
    '@typescript-eslint/prefer-regexp-exec': ['error'],

    // Enforce the use of String#startsWith and String#endsWith instead of other equivalent methods of checking substrings. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-string-starts-ends-with.md
    '@typescript-eslint/prefer-string-starts-ends-with': ['error'],

    // Recommends using @ts-expect-error over @ts-ignore. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/prefer-ts-expect-error.md
    // '@typescript-eslint/prefer-ts-expect-error': 'error',

    // Requires any function or method that returns a Promise to be marked async.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/promise-function-async.md
    '@typescript-eslint/promise-function-async': ['error'],

    // Requires Array#sort calls to always provide a compareFunction.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-array-sort-compare.md
    '@typescript-eslint/require-array-sort-compare': ['error', {
        ignoreStringArrays: true
    }],

    // When adding two variables, operands must both be of type number or of type string. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-plus-operands.md
    '@typescript-eslint/restrict-plus-operands': ['error'],

    // Enforce template literal expressions to be of string type. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/restrict-template-expressions.md
    '@typescript-eslint/restrict-template-expressions': ['error', {
        allowNumber: true,
        allowBoolean: true
    }],

    // Restricts the types allowed in boolean expressions.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/strict-boolean-expressions.md
    //'@typescript-eslint/strict-boolean-expressions': ['error'],

    // Exhaustiveness checking in switch with union type.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/switch-exhaustiveness-check.md
    '@typescript-eslint/switch-exhaustiveness-check': ['error'],

    // Sets preference level for triple slash directives versus ES6-style import declarations. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/triple-slash-reference.md
    '@typescript-eslint/triple-slash-reference': ['error', { 'path': 'never', 'types': 'never', 'lib': 'never' }],

    // Require consistent spacing around type annotations. Fixable.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/type-annotation-spacing.md
    '@typescript-eslint/type-annotation-spacing': ['error'],

    // Requires type annotations to exist.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/typedef.md
    // '@typescript-eslint/typedef': 'error',

    // Enforces unbound methods are called with their expected scope. Recommended.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unbound-method.md
    '@typescript-eslint/unbound-method': ['error'],

    // errors for any two overloads that could be unified into one by using a union or an optional/rest parameter.
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/unified-signatures.md
    '@typescript-eslint/unified-signatures': ['error']
};