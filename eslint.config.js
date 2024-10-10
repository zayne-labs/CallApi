import zayne from "@zayne-labs/eslint-config";

export default zayne({
	ignores: ["dist/**", "eslint.config.js"],
	typescript: {
		tsconfigPath: "tsconfig.eslint.json",
	},
});
