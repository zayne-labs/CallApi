export default {
	"*.{js,ts,jsx,tsx}": () => "pnpm lint:eslint",
	"*.{ts,tsx}": () => "pnpm lint:check-types",
	/**
	 * Add attw back when this issue is resolved
	 * @see https://github.com/arethetypeswrong/arethetypeswrong.github.io/issues/112
	 */
	"package.json": ["pnpm lint:publint"],
};
