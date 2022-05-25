/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";

const packageJson = require("./package.json");

const dependencies = ({ dependencies }) => Object.keys(dependencies || {});

const pkgdependencies = dependencies(packageJson);

export default [
	{
		input: "index.ts",
		output: [
			{
				file: packageJson.main,
				format: "cjs",
				sourcemap: false,
			},
			{
				file: packageJson.module,
				format: "esm",
				sourcemap: false,
			},
		],
		external: id => pkgdependencies.includes(id),
		plugins: [
			resolve(),
			commonjs(),
			peerDepsExternal(),
			terser(),
			typescript({
				sourceMap: false,
				tsconfig: "./tsconfig.json",
			}),
		],
	},
	{
		input: "dist/esm/types/index.d.ts",
		output: [{ file: "dist/index.d.ts", format: "esm" }],
		plugins: [dts()],
	},
];
