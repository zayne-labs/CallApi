import { useRouter } from "next/router";
import { type DocsThemeConfig, useConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
	docsRepositoryBase: "https://github.com/zayne-labs/callApi",
	footer: {
		component: () => {
			return <></>;
		},
		text: "CallApi docs",
	},
	head: () => {
		const { asPath, defaultLocale, locale, pathname } = useRouter();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const { frontMatter } = useConfig();
		// eslint-disable-next-line sonarjs/no-nested-template-literals
		const url = `https://zayne-callapi.netlify.app${defaultLocale === locale ? asPath : `/${locale}${asPath}`}`;

		return (
			<>
				<title className="font-bold">
					{pathname === "/"
						? "CallApi"
						: `${
								pathname.replaceAll("/", "").charAt(0).toUpperCase() +
								pathname.replaceAll("/", "").slice(1)
							} - CallApi`}
				</title>
				<meta content="CallApi Docs - Documrentation for CallApi" name="description" />
				<meta content={url} property="og:url" />
				{/* eslint-disable @typescript-eslint/no-unsafe-member-access */}
				{/* eslint-disable @typescript-eslint/no-unsafe-assignment */}
				<meta content={frontMatter.title ?? "CallApi"} property="og:title" />
				<meta content={frontMatter.description ?? "CallApi docs"} property="og:description" />
			</>
		);
	},
	logo: (
		<div className="flex items-center gap-4">
			<p className="text-lg font-bold text-primary md:text-xl ">CallApi</p>
		</div>
	),
	project: {
		link: "https://github.com/zayne-labs/callApi",
	},
};

export default config;
