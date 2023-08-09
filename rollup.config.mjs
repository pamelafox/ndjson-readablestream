import { dts } from "rollup-plugin-dts";

import pkg from './package.json'  assert { type: "json" }

export default [
	// browser-friendly UMD build
	{
		input: 'index.mjs',
		output: {
			name: 'readNDJSONStream',
			file: pkg.browser,
			format: 'umd'
		}
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify
	// `file` and `format` for each target)
	{
		input: 'index.mjs',
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	},

	{
		input: "index.d.ts",
		output: [{ file: pkg.types, format: "es" }],
		plugins: [dts()],
	},
];