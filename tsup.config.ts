import { type Options, defineConfig } from "tsup";

const isDevMode = process.env.NODE_ENV === "development";

const commonOptions = {
	clean: true, // clean up dist folder,
	dts: true,
	minify: isDevMode ? false : "terser",
	sourcemap: !isDevMode,
	tsconfig: "tsconfig.json",
} satisfies Options;

export default defineConfig([
	{
		...commonOptions,
		entry: ["src/index.ts", "src/utils/index.ts"],
		format: ["esm"],
		outDir: "./dist/esm",
		platform: "browser",
		splitting: true,
		target: "esnext",
		treeshake: true,
	},
	{
		...commonOptions,
		entry: ["src/index.ts", "src/utils/index.ts"],
		format: ["cjs"],
		outDir: "./dist/cjs",
		platform: "node",
	},
]);
