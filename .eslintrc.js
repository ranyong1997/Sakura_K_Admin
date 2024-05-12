// @ts-check
const { defineConfig } = require('eslint-define-config')
module.exports = defineConfig({
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 2020,
		sourceType: 'module',
		jsxPragma: 'React',
		ecmaFeatures: {
			jsx: true
		}
	},
	extends: [
		'plugin:vue/vue3-recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'plugin:prettier/recommended'
	],
	rules: {
		'vue/no-setup-props-destructure': 'off',
		'vue/script-setup-uses-vars': 'error',
		'vue/no-reserved-component-names': 'off',
		'@typescript-eslint/ban-ts-ignore': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'vue/custom-event-name-casing': 'off',
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'no-unused-vars': 'off',
		'space-before-function-paren': 'off',
		'vue/attributes-order': 'off',
		'vue/one-component-per-file': 'off',
		'vue/html-closing-bracket-newline': 'off',
		'vue/max-attributes-per-line': 'off',
		'vue/multiline-html-element-content-newline': 'off',
		'vue/singleline-html-element-content-newline': 'off',
		'vue/attribute-hyphenation': 'off',
		'vue/require-default-prop': 'off',
		'vue/require-explicit-emits': 'off',
		"prettier/prettier": "off",
		'vue/html-self-closing': [
			'error',
			{
				html: {
					void: 'always',
					normal: 'never',
					component: 'always'
				},
				svg: 'always',
				math: 'always'
			}
		],
		'vue/multi-word-component-names': 'off',
		'vue/no-v-html': 'off',
		'vue/require-toggle-inside-transition': 'off'
	}
})
