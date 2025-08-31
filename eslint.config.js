import js from "@eslint/js"
import globals from "globals"
import pluginVue from "eslint-plugin-vue"
import pluginVuePug from "eslint-plugin-vue-pug"
import pluginQuasar from "@quasar/app-vite/eslint"
import {
	defineConfigWithVueTs,
	vueTsConfigs,
} from "@vue/eslint-config-typescript"
import prettierSkipFormatting from "@vue/eslint-config-prettier/skip-formatting"

export default defineConfigWithVueTs(
	{
		/**
		 * Ignore the following files.
		 * Please note that pluginQuasar.configs.recommended() already ignores
		 * the "node_modules" folder for you (and all other Quasar project
		 * relevant folders and files).
		 *
		 * ESLint requires "ignores" key to be the only one in this object
		 */
		// ignores: [],
	},

	pluginQuasar.configs.recommended(),
	js.configs.recommended,

	/**
	 * https://eslint.vuejs.org
	 *
	 * pluginVue.configs.base
	 *   -> Settings and rules to enable correct ESLint parsing.
	 * pluginVue.configs[ 'flat/essential']
	 *   -> base, plus rules to prevent errors or unintended behavior.
	 * pluginVue.configs["flat/strongly-recommended"]
	 *   -> Above, plus rules to considerably improve code readability and/or dev experience.
	 * pluginVue.configs["flat/recommended"]
	 *   -> Above, plus rules to enforce subjective community defaults to ensure consistency.
	 */
	pluginVue.configs["flat/essential"],
	pluginVuePug.configs["flat/recommended"],

	{
		files: ["**/*.ts", "**/*.vue"],
		rules: {
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{ prefer: "type-imports" },
			],
		},
	},
	// https://github.com/vuejs/eslint-config-typescript
	vueTsConfigs.recommendedTypeChecked,

	{
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",

			globals: {
				...globals.browser,
				...globals.node, // SSR, Electron, config files
				process: "readonly", // process.env.*
				ga: "readonly", // Google Analytics
				cordova: "readonly",
				Capacitor: "readonly",
				chrome: "readonly", // BEX related
				browser: "readonly", // BEX related
			},
		},

		// add your custom rules here
		rules: {
			"prefer-promise-reject-errors": "off",
			"vue/order-in-components": "off",
			"@typescript-eslint/no-non-null-assertion": "off", // Allow non-null assertions using `!`
			"vue/no-unused-components": "warn", // Don't block compilation while developing
			"vue/multi-word-component-names": "off", // We have a lot of single word component names like `Contacts`.
			"vue/attribute-hyphenation": ["warn", "never"], // Preserve the original attribute names/casing.
			"vue/v-on-event-hyphenation": ["warn", "never"], // Preserve the original event names/casing.
			// Order attributes the default way except slots go first
			"vue/attributes-order": [
				"warn",
				{
					order: [
						"SLOT",
						"DEFINITION",
						"LIST_RENDERING",
						"CONDITIONALS",
						"RENDER_MODIFIERS",
						"GLOBAL",
						"UNIQUE",
						"TWO_WAY_BINDING",
						"OTHER_DIRECTIVES",
						"OTHER_ATTR",
						"EVENTS",
						"CONTENT",
					],
				},
			],
			"vue-pug/component-name-in-template-casing": [
				"warn",
				"PascalCase",
				{ registeredComponentsOnly: false },
			],
			"vue/no-restricted-component-names": [
				"error",
				{
					name: "/.*/",
					message:
						"When Using Single File Components, a component's name is derived from the filename. Please do not overwrite this.",
				},
			],
			"vue/block-lang": [
				"error",
				{
					template: {
						lang: "pug",
					},
					script: {
						lang: "ts",
					},
					style: {
						lang: "sass",
					},
				},
			],
			"vue/comment-directive": "off",
			"prefer-promise-reject-errors": "off",
			quotes: [
				"warn",
				"double",
				{ avoidEscape: true, allowTemplateLiterals: true },
			],
			// The core 'no-unused-vars' rules (in the eslint:recommended ruleset)
			// 'no-unused-vars': 'off',
			// '@typescript-eslint/no-unused-vars': 'off',
			"max-len": "off",
			// allow console.log during development only
			"no-console": process.env.NODE_ENV === "production" ? "off" : "off",
			// allow debugger during development only
			"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
		},
	},

	{
		files: ["src-pwa/custom-service-worker.ts"],
		languageOptions: {
			globals: {
				...globals.serviceworker,
			},
		},
	},

	prettierSkipFormatting
)
