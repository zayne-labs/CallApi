# @zayne-labs/callapi

## 1.15.1

### Patch Changes

- b4d4910: refactor(callapi): remove fragment handling

## 1.15.0

### Minor Changes

- 109af39: ⏱️ feat(callapi): add Retry-After header support with respectRetryAfter option
  🗺️ feat(callapi): add defineFallbackRouteSchema helper export
  🔐 fix(callapi): treat null as missing auth value alongside undefined
  🔗 fix(callapi): preserve URL fragment when merging query parameters
  📦 fix(callapi): parse media type from Content-Type ignoring parameters
  🗑️ fix(callapi): auto-clean empty global scope dedupe caches
  🎨 refactor(callapi): sort defaults config and remove lint bypass comments
  🙈 feat(logger-plugin): add redact option for sensitive verbose error data
  📝 fix(logger-plugin): enable onResponse flag for success and error responses
  ✨ refactor(logger-plugin): standardize log message format and structure
  📄 docs(retry): document Retry-After header configuration
  📄 docs(logger): document redact option and onResponse enabled flag
  🤖 ci(workflow): bump pnpm to v12.3.4 and add Playwright browser tests
  ✅ test(callapi): add coverage for auth, dedupe, retry, URL, and common utils
  ✅ test(logger-plugin): add tests for redaction and updated log formats
  🧰 chore(callapi): rename TSUP to TSDOWN in build:test concurrently label

## 1.14.2

### Patch Changes

- bfd60e1: ✨ feat(callapi): improve URL param and query serialization by encoding path segments, normalizing baseURL joins, preserving repeated URLSearchParams values, and replacing duplicate query keys
  🧪 test(callapi): add coverage for structured query serialization, repeated query params, normalized baseURL slashes, encoded path params, and repeated placeholder resolution
  ✨ feat(callapi-plugins): improve logger output with method-aware prefixes, status text, durations, better error formatting, and a new Vitest logger test suite
  📝 docs(apps-docs): migrate the docs source pipeline to Satteri, add a copyable Markdown link action, move shared LLM and page-image helpers, and refresh URL helper and migration guidance
  ⬆️ chore(deps): bump pnpm to 11.24.0, add @fumadocs/satteri, enable plugin test scripts, relax workspace build settings, and align GitHub Actions with the new pnpm version

## 1.14.1

### Patch Changes

- a6770b1: 🧪 test(callapi): add plugin & hooks type-level tests
  🧪 test(callapi): add result type inference tests for all result modes
  🧪 test(callapi): add schema routing & strict mode type tests
  📦 deps: update pnpm lockfile

## 1.14.0

### Minor Changes

- 47bc462: ✨ feat(callapi): add bodyTransformer option for custom body transformation
  📝 docs: update documentation for bodyTransformer
  🧪 test: add tests for bodyTransformer functionality
  ⬆️ deps: update dependencies

## 1.13.0

### Minor Changes

- a812e72: feat(callapi): ✨ redesign refetch logic to be flag-based and intuitive in how it works
  refactor(callapi): ♻️ simplify retry manager and improve delay strategy
  refactor(callapi): ♻️ ensure dedupe cache is cleared before refetch or retry
  fix(callapi): 🩹 improve error result resolution and hook execution in catch blocks
  fix(callapi): 🩹 provide better error messages for AbortError and TimeoutError
  chore(docs): 🔧 enable experimental typedEnv and typedRoutes in Next.js config
  chore(deps): 📦 update dependencies
   - update next to 16.2.6
   - update react to 19.2.6
   - update tailwindcss to 4.3.0
   - update @zayne-labs/tsconfig to 0.13.12
   - update @zayne-labs/prettier-config to 0.13.12
   - update fumadocs-core to 16.8.9
   - update vite to 8.0.11
   - update turbo to 2.9.12

## 1.12.6

### Patch Changes

- e0f9a8b: feat(callapi): perf updates
   - Move common type definitions from types/common.ts to new types/options-types.ts for better organization
   - Rename initializePlugins to initializePluginsAndHooks to better reflect its functionality
   - Add debugMode option to extraOptionDefaults with default value of true
   - Update all import statements across the codebase to reference new options-types module
   - Optimize AbortController initialization to be null when dedupeStrategy is "none"
   - Refactor dedupe strategy logic to simplify shouldDisableDedupe check
   - Add debugMode parameter to getFullAndNormalizedURL function call
   - Update type annotations for newFetchController to allow null values
   - Add performance test suite for benchmarking core operations
   - Enhance test setup with dedicated callapi-setup configuration
   - Update vitest configuration for improved test execution
   - Consolidate type imports and reorganize import order for consistency

## 1.12.5

### Patch Changes

- 12c84c8: - Add null chunk support to StreamProgressEvent for completion tick signaling
   - Implement accurate progress calculation with epsilon handling to prevent premature 100% reporting
   - Replace calculateTotalBytesFromBody with estimateBodySize for better body size estimation across multiple types (FormData, Blob, ArrayBuffer, URLSearchParams, strings)
   - Refactor stream tracking logic into createTrackedStream for improved code organization
   - Update type helpers with DistributivePick utility for better type flexibility
   - Add isString guard utility for type checking
   - Improve streaming test coverage for progress events and edge cases
   - Update guards test suite with new utility functions
   - Increase size-limit from 6.8 kb to 7 kb to accommodate new streaming enhancements
   - Add callapi.code-workspace for multi-project development setup
   - Update dev client with streaming method specification and commented test cases

## 1.12.4

### Patch Changes

- d5e18c1: perf: reduce bundle size and improve polyfill handling
   - Lower size-limit from 7kb to 6.8kb by removing dynamic imports for polyfills
   - Replace async polyfill imports with direct function calls for AbortSignal.timeout/any
   - Refactor deterministicHashFn for better readability by moving comment closer to usage

## 1.12.3

### Patch Changes

- 4777b99: feat(callapi): attempts at adding polyfills for .any and .timeout signals, while reducing bundle size from other opportunities

## 1.12.2

### Patch Changes

- 62c0c6d: feat(callapi): support extraFetchOptions for flexible fetch config merging
   - Add extraFetchOptions to ModifiedRequestInit type for plugin and request-level fetch overrides
   - Update plugin initialization to merge extraFetchOptions from plugin setup
   - Modify createFetchClient to properly merge extraFetchOptions from base and instance configs
   - Add tests for extraFetchOptions merging behavior with plugins and skipAutoMergeFor
   - Update fetchSpecificKeys constant to include extraFetchOptions
   - Refactor docs layout to use fumadocs-core Link and improve version display
   - Upgrade dependencies across monorepo including Next.js, ESLint, and TypeScript configs
   - Fix OG image generation to use import.meta.url for font loading
   - Improve chat context utilities with better file sorting and monorepo root detection

## 1.12.1

### Patch Changes

- de4a259: refactor: make headers to be a headers object when passed to hooks

   refactor: export objectifyHeaders util from callapi

## 1.12.0

### Minor Changes

- 5bf8413: feat: ✨ add refetch functionality to error hooks

   feat(hooks): 🎣 add refetch function to error context options
   feat(refetch): 🔄 implement refetch manager with attempt limiting
   feat(types): 📝 add refetch types and interfaces
   test(refetch): 🧪 add comprehensive refetch test suite
   feat(constants): 📋 add refetchAttempts default value
   refactor(client): 🔧 integrate refetch into fetch client
   refactor(retry): 🛠️ update retry logic for refetch compatibility

## 1.11.46

### Patch Changes

- 3033986: feat(types): ✨ add InferAllMainRoutes utility and improve type inference

   feat(types): 🏷️ introduce InferAllMainRoutes type utility for better route handling
   refactor(types): ♻️ rename InferMethodFromURL to ExtractMethodFromURL for clarity
   refactor(types): 🔧 improve InferAllMainRouteKeys using new utility type
   style(types): 💅 enhance InferMethodOption with stricter generic constraints

## 1.11.44

### Patch Changes

- be2f46d: refactor(types): improve type inference for defineBaseConfig

   Update defineBaseConfig to properly infer return type when using function configuration, ensuring deep writeable properties are correctly applied to the function's return value.

## 1.11.43

### Patch Changes

- 8aaff38: feat: add defineInstanceConfig helper

## 1.11.42

### Patch Changes

- 87b0a08: feat(callapi): add fetchApi result mode and improve result handling
   - Implement new 'fetchApi' result mode that returns raw Response object
   - Skip data parsing and validation when resultMode is 'fetchApi'
   - Update type definitions and rename ThrowOnErrorUnion to ThrowOnErrorBoolean
   - Add comprehensive tests for all result modes
   - Improve documentation for result mode options

## 1.11.41

### Patch Changes

- f2a6d3f: feat(validation): add schema validation for toFormData and toQueryString
  fix(dedupe): correct duplicate request error message
  perf(common): optimize URLSearchParams usage and remove polyfills
  refactor(types): improve response parser and conditional types
  docs(meta): update documentation structure and content

## 1.11.40

### Patch Changes

- 87156c1: refactor(callapi)!: replace forcefullyCalculateStreamSize with request-only option 💥
  refactor(callapi): consolidate option validation logic ♻️
  refactor(callapi): rename updatedOptions to updatedConfig in retry/dedupe ♻️
  test(callapi): suppress invalid URL console errors in setup 🧪
  chore(callapi): update types and remove unused exports 🧹

## 1.11.39

### Patch Changes

- 07419a2: chore(release): prepare release with breaking refactors and doc updates

   refactor(callapi)!: simplify retry and dedupe configuration by removing nested options 💥
   refactor(callapi): rename updatedOptions to updatedConfig and improve error handling ♻️
   feat(docs): migrate to Vercel and enhance SEO with structured data 🚀
   build(deps): update @zayne-labs toolkit dependencies to 0.12.22 ⬆️
   chore(ci): fix incorrect eslint command and apply automated fixes 🔧

## 1.11.38

### Patch Changes

- a0a5e05: feat(callapi): export context type helpers

   chore: update dependencies and refactor code organization
   - Update various package dependencies including @zayne-labs packages
   - Refactor import statements and code organization across multiple files
   - Simplify prettier config files using zayne helper
   - Remove unused bundle analyzer from next config

## 1.11.37

### Patch Changes

- 5de1d27: feat(url): ✨ improve URL handling with method extraction and validation enhancements

   🚀 Enhanced URL processing with improved method extraction from URLs
   🔧 Refactored validation system for better schema handling and route key resolution
   🧪 Added comprehensive utility function tests and URL integration tests
   ⚡️ Improved error handling and URL normalization logic
   📦 Updated package dependencies and workflow configurations
   🎨 Enhanced type definitions with better conditional types and helpers

   feat(validation): 🎯 enhance schema resolution and route key handling
   - Improved `getResolvedSchema` function with better context passing
   - Enhanced `getCurrentRouteSchemaKeyAndMainInitURL` with prefix/baseURL handling
   - Added `removeLeadingSlash` utility for consistent path processing
   - Refactored method extraction to use proper route key methods validation

   test(utils): 🧪 add comprehensive utility function tests
   - Added extensive tests for type guards, common utilities, and configuration splitting
   - Implemented URL integration tests for fetch client functionality
   - Enhanced test coverage for body processing, header handling, and error scenarios

   fix(url): 🔧 improve URL normalization and method extraction
   - Fixed `extractMethodFromURL` to properly validate route key methods
   - Enhanced `normalizeURL` with configurable options for relative URL handling
   - Improved error messages for invalid URL scenarios
   - Added `atSymbol` constant for consistent method prefix handling

## 1.11.36

### Patch Changes

- 35e973b: feat(plugins): ✨ enhance plugin system with improved TypeScript support and extra options inference

   feat(types): 🏷️ add PluginMiddlewares type and improve plugin type definitions
   feat(plugins): 🔧 improve InferPluginExtraOptions utility type to also accept passing typeof schema directly for convenience
   docs(plugins): 📚 update plugin documentation with enhanced TypeScript examples
   test(plugins): ✅ update plugin tests to reflect new type changes

## 1.11.35

### Patch Changes

- 278c29d: feat(url): add slash when joining baseURL with relative paths 🔗
  fix(url): validate full URL with URL.canParse and log helpful hint 🧯
  feat(utils): infer Content-Type from body; respect explicit header 🧠
  feat(utils): support x-www-form-urlencoded via toQueryString when header set 🧾
  refactor(guards): rename isSerializable → isSerializableObject ♻️
  refactor(client): pass resolved headers to getBody for correct serialization 🔧
  feat(types): merge prefix/baseURL with route keys including @METHOD/… 🧩
  refactor(validation): rename disableValidationOutputApplication → disableRuntimeValidationTransform ✨
  test(url|utils|validation): update expectations and cases to new behavior ✅
  chore(deps): bump vitest and zod; refresh lockfile ⬆️
  chore(pkg): apply minor package.json updates across workspace 🧹
  break(validation): rename schema config flag; user code must update 🚨

## 1.11.34

### Patch Changes

- b8147ce: fix(url): handle url normalization differently for protocol URLs

   Modify normalizeURL to preserve protocol URLs by not adding a leading slash when the URL contains "http". Add tests to verify proper handling of both protocol and non-protocol URLs.

## 1.11.33

### Patch Changes

- 584565d: refactor(callapi): improve auth typing and inference ♻️

   refactor(callapi): rename `Auth` to `AuthOption` and refine auth types (Bearer, Token, Basic, Custom) ♻️
   feat(callapi): add `InferAuthOption` to support schema-based auth typing ✨
   fix(callapi): update usages of `Auth` to `AuthOption` in hooks and common types 🔧
   docs: update authorization documentation to reflect new types 📚
   test: update auth tests to match new type definitions ✅
   chore: update dependencies and lockfile 📦

## 1.11.31

### Patch Changes

- 8b4fe33: refactor(callapi): improve type naming and validation handling
   - rename CallApiSuccessOrErrorVariant to CallApiResultSuccessOrErrorVariant for consistency
   - simplify ResultModeMap type structure and remove redundant types
   - enhance schema validation with support for per-field disable flags
   - streamline request options validation and header resolution
   - update tests to reflect changes in type names and validation behavior

- c3b60d0: refactor: Improve type preview by wrapping withoutResponse with Prettify utility type

## 1.11.30

### Patch Changes

- 026a76c: refactor(callapi): improve type inference and global declarations ♻️

   fix(callapi): move `ReadableStream` global declaration to `reset.d.ts` to prevent tsdown for always bundling it 🚚

   feat(callapi): use `NoInferUnMasked` helper for over NoInfer for better tooltips ✨

   fix(callapi, types): add `NoInfer` usage to sharedOptions type to prevent middlewares and hooks from inferring the data and error as unknown🔧

## 1.11.29

### Patch Changes

- d49f07d: fix(callapi): Fix snd refactor types
   - refactor(types): Rename `GetCallApiResult` to `InferCallApiResult`
   - refactor(core): Improve `SharedExtraOptions` to support context overriding
   - fix(stream): Add default generic to `ReadableStream` augmentation
   - docs(middlewares): Fix caching plugin usage and enable twoslash
   - ci(workflows): Update pnpm version to 10.24.0
   - chore(deps): Update lockfile

- 75163e4: refactor(types): rename InferredPluginOptions to InferredExtraOptions for consistency

   docs: update plugin and client type references in documentation
   fix: downgrade prettier to 3.6.2 due to compatibility issues
   style: reorganize imports in layout.shared.tsx

## 1.11.28

### Patch Changes

- 91a8114: refactor(callapi): further improve type simplification in a few core areas
   - Add GetMergedCallApiContext type for better context merging
   - Simplify Hooks interface by removing redundant generic params
   - Update Middlewares interface to support context types
   - Remove type-preserving overload from toFormData utility
   - Reorganize imports in test files

## 1.11.27

### Patch Changes

- ffc4873: refactor(core): ♻️ Standardize context types and generics
   - refactor(types): Introduce `DefaultCallApiContext` and update default generic parameters across config types
   - refactor(hooks): Update hook context types to be generic and accept `TCallApiContext`
   - refactor(types): Rename `InferExtendSchemaConfigContext` to `GetExtendSchemaConfigContext`
   - refactor(types): Move `InferParamsFromRoute` to `conditional-types.ts`
   - refactor(core): Remove `types/index.ts` and update `src/index.ts` exports
   - chore(deps): Update lockfile

## 1.11.26

### Patch Changes

- 6f5b3f9: feat: add null and undefined to allowed values
- 829431b: refactor(callapi): rename CallApiEnv to CallApiContext and related types

   Rename CallApiEnv to CallApiContext to better reflect its purpose as a context provider rather than environment configuration. Update all related types and functions to use the new naming convention, including createFetchClientWithEnv becoming createFetchClientWithContext. This change improves code clarity and maintainability.

## 1.11.25

### Patch Changes

- 70487f8: chore(dev): 🔧 Update dev app dependencies in apps/dev/package.json
  chore(docs): 🧹 Remove generated .next type files and outdated logos
  docs(docs): 📝 Update docs pages, OG routes, components, metadata, and config
  chore(repo): 📦 Update root package.json and pnpm-lock.yaml
  chore(plugins): 📦 Adjust callapi-plugins package.json
  docs(callapi): 📝 Refresh SOCIAL_MEDIA_POST.md formatting
  refactor(core): ♻️ Overhaul createFetchClient internals and options handling
  refactor(core): 🔧 Tidy main index exports
  refactor(types): 🔧 Improve common, conditional, and helper type definitions
  refactor(core): ♻️ Streamline result handling logic
  refactor(utils): 🔧 Update common utilities for consistency

## 1.11.24

### Patch Changes

- 8671045: refactor(type-helpers): revert to older version of satisfies type due to errors from callback properties in defineBaseConfig

## 1.11.23

### Patch Changes

- 78c1364: refactor(types): 🔧 Improve type definitions and helper functions

   \- refactor(types): Rename `MatchExactObjectType` with `Satisfies`

   \- refactor(utils): Enhance `defineBaseConfig` with function overload support

   \- chore(config): Update tsdown config from `Options` to `UserConfig`

   \- refactor(index): Minor updates to main export file

   feat(types): add BaseSchemaRouteKeyPrefixes type and refactor route types

   Add new type for schema route key prefixes to improve type organization and reuse.

   Refactor BaseCallApiSchemaRoutes to use the new type for better maintainability.

## 1.11.22

### Patch Changes

- de2f92a: refactor: change how validation errors are displayed

## 1.11.21

### Patch Changes

- 6782be6: refactor(types): 🔄 Use InferSchemaInput instead of InferSchemaOutput for input types like query and params to avoid the issue of lying to ts

   feat(validation): Export `InferSchemaResult` type from validation module.

## 1.11.20

### Patch Changes

- 8f2f684: fix(callapi): add response-less variant types for API results

   Introduce new type variants (SuccessVariantWithoutResponse and ErrorVariantWithoutResponse) to properly type API results when response field is omitted. This provides better type safety than simple Omit operation.

## 1.11.18

### Patch Changes

- 165b969: refactor(result): improve type definition for withoutResponse mode

   Use Omit<TComputedResult, "response"> instead of union type to better represent the structure when response is excluded

## 1.11.17

### Patch Changes

- ab889c8: feat: add missing define helpers

## 1.11.16

### Patch Changes

- dac80c9: refactor(validation)!: change fallback route schema key to @default

   The fallback route schema key has been updated from '.' to '@default' for better clarity and consistency. The type definition has been moved to constants/validation.ts and imported where needed to improve code organization.

## 1.11.15

### Patch Changes

- 5672cc7: feat: re-add withoutResponse resultMode option

## 1.11.12

### Patch Changes

- 6958f4f: refactor(validation): improve type inference and dedupe logic
   - Refactor type inference to handle input/output variants separately
   - Optimize dedupe strategy with proper task queue scheduling
   - Move fallBackRouteSchemaKey to constants
   - Update build config to include constants exports

## 1.11.9

### Patch Changes

- 89c1cef: fix: slight error in types

## 1.11.8

### Patch Changes

- f64dae5: fix: enhance CallAPI type definitions and configuration options

## 1.11.7

### Patch Changes

- 1bcf35f: refactor(core): 🔄 Reorganize utility functions and improve code structure
   - refactor(utils): Move helpers.ts to utils/external/body.ts
   - feat(utils): Add new external utility modules for define and guards
   - refactor(core): Remove defineHelpers.ts in favor of utils/external/define.ts
   - refactor(utils): Delete utils/index.ts and create utils/external/index.ts
   - docs(validation): Update validation documentation
   - chore(dev): Update client and server code in dev app
   - chore(plugins): Modify logger implementation

## 1.11.6

### Patch Changes

- d5c0a35: feat(utils): add FormData conversion utility and improve query string handling
   - Add `toFormData` utility for converting objects to FormData
   - Enhance support for different data types in FormData conversion
   - Move `toQueryString` to a separate helpers file for better organization
   - Add type-preserving mode for FormData conversion
   - Improve documentation for new utility functions
   - Update Vitest to version 4.0.1 in package dependencies
   - Add `isBlob` type guard to utils
   - Refactor and clean up utility functions

## 1.11.5

### Patch Changes

- 63ecf19: fix(callapi): improve dedupe key handling and update docs formatting
   - Fix dedupe key resolution logic to properly handle undefined values
   - Update type definitions to allow undefined return values for dedupe callbacks
   - Normalize indentation in README.md examples
   - Add .\*md to prettierignore

## 1.11.4

### Patch Changes

- 8c31997: refactor(dedupe): extract dedupe cache scope key logic to function

   Move the dedupe cache scope key resolution logic into a separate function for better maintainability and reusability. Also update the type definition to support function values.

## 1.11.3

### Patch Changes

- 70ebf9e: refactor(callapi): consolidate default options and improve type safety
   - Rename default-options.ts to defaults.ts for better clarity
   - Add new CallApiSuccessOrErrorVariant type for better type safety
   - Improve error handling with more specific error result types
   - Update imports across multiple files to use new defaults.ts
   - Refactor result type handling for better maintainability

## 1.11.2

### Patch Changes

- 8006bfc: feat(middlewares): add middleware documentation and refactor fetch middleware implementation

   refactor(callapi): rename composeAllHooks to composeHooksFromArray and composeAllMiddlewares to composeMiddlewaresFromArray

   refactor(callapi): update fetch middleware to receive request context

   docs: add comprehensive middlewares documentation with examples

   chore: update dependencies across packages
   style: standardize zod imports from namespace to named imports

## 1.11.1

### Patch Changes

- f0b9575: feat(type-helpers): add RemovePrefix utility type for key transformation

   refactor(retry): simplify retry options type using RemovePrefix
   refactor(dedupe): apply same pattern to dedupe options type

   docs: add social media post introducing CallApi features

## 1.11.0

### Minor Changes

- 3860cb7: feat(middleware): ✨ implement fetch middleware composition system
   - Add fetchMiddleware option to enhance fetch function with composable middleware pattern
   - Support middleware at base config, plugin, and per-request levels
   - Implement proper composition order: per-request → plugins → base → customFetchImpl → fetch
   - Add comprehensive tests for middleware composition, caching implementation, and integration
   - Create example caching plugin implementation using the middleware system

## 1.10.6

### Patch Changes

- ee21de9: refactor(hooks): rename onBeforeRequest to onRequestReady and clean up schema config
   - Rename onBeforeRequest hook to onRequestReady for better semantic meaning
   - Remove unused schemaConfig from GetMethodContext type
   - Reorder imports and clean up type definitions
   - Update corresponding test cases to reflect hook name change

## 1.10.5

### Patch Changes

- 8437089: feat(callapi): add onBeforeRequest hook and refactor method handling
   - Introduce new onBeforeRequest hook for early request lifecycle interception
   - Move method-related utilities to utils/common.ts for better organization
   - Update tests to cover new hook functionality
   - Rename slot.tsx to slot.ts in docs components for consistency

## 1.10.4

### Patch Changes

- 1cd3367: fix(callapi): add polyfill to AbortSignal methods to avoid crashes on edge runtime

## 1.10.3

### Patch Changes

- edf52fb: feat(validation): add issueCause to ValidationError and improve schema validation
   - Add issueCause field to ValidationError to track validation failure source
   - Refactor schema validation to use full schema context
   - Update logger plugin to support basic and verbose modes
   - Fix package.json exports configuration
   - Update tests to include new issueCause field

## 1.10.2

### Patch Changes

- c69f3d6: refactor: eliminate redundant resultMode variants, use throwOnError for type narrowing
   - Remove 'allWithException' and 'onlySuccessWithException' result modes
   - Use throwOnError: true to automatically narrow types and remove null variants
   - Update type system to conditionally return non-null types when throwOnError: true
   - Simplify API to just 'all' and 'onlySuccess' modes + throwOnError flag
   - Update tests and documentation to use new pattern
   - Fix flaky timing test in hooks.test.ts (>= instead of > for CI stability)

## 1.10.1

### Patch Changes

- 605af9d: refactor(validation): rename InferSchemaResult to InferSchemaOutputResult and add InferSchemaInputResult

   feat(validation): use inferSchemaInputResult for everything other than data and errorData, so that transformations don't affect the schema type when passing data to, for instance., the body

   Improve type naming clarity by distinguishing between input and output schema inference types. This change better reflects the purpose of each type and maintains consistency in the validation system.

## 1.10.0

### Minor Changes

- e78a454: 🐛 feat(result): improve response type detection for better content handling

   ✅ test(errors): add test for successful response with invalid JSON content
   🔧 chore(package): increase size limit from 5.8kb to 6kb

## 1.9.12

### Patch Changes

- d393723: 🐛 fix(retry): handle aborted signals and improve retry condition logic

   🧪 test(callapi): add browser testing config and improve test coverage

   ✨ feat(testing): add vitest.browser.config.ts for browser-based testing with Playwright
   🔧 chore(config): update vitest.config.ts to remove text reporter and simplify typecheck config

   ✅ test(utils): add comprehensive tests for type guards with various data types
   🔄 ci(turbo): add test-related tasks to turbo.json for better pipeline management
   🗑️ chore(cleanup): remove .kiro spec files that are no longer needed

## 1.9.11

### Patch Changes

- 4a9fcdf: fix: properly infer response types

## 1.9.10

### Patch Changes

- 40c8a4e: fix: validation bug due to wrong arguments passed

## 1.9.9

### Patch Changes

- fc435f4: refactor: update parameter patterns in conditional-types and clean up client.ts comments; remove unused test-params file

## 1.9.7

### Patch Changes

- b47396f: feat(callapi/validation): export fallBackRouteSchemaKey constant and type to enable external access to fallback route resolution ✨

## 1.9.6

### Patch Changes

- c2f7fea: feat(callapi-validation)!: add fallback route schema '.' and merge with current route (current takes precedence) ✨💥
  feat(callapi-types): exclude fallback key from inferred route keys in type computations ✨
  feat(callapi-types): export FallBackRouteSchemaKey for cross-package typing ✨
  fix(callapi-types): correct params required inference to check undefined (not null) 🐛
  refactor(callapi-types,callapi-validation)!: rename schema context baseSchema -> baseSchemaRoutes; pass resolved currentRouteSchema ♻️💥
  feat(callapi-types): improve route param extraction with PossibleParamNamePatterns and explicit processing order for ':param' then '{param}' ✨
  feat(dev-client): use object path params and query for GitHub commits; add schema entry ✨
  docs(callapi-types): clarify JSDoc for instance schema and schemaConfig behavior 📝
  chore(deps): update package.json files and pnpm-lock.yaml ⬆️

   feat:(callapi-types,callapi-validation): schema callback context renamed from baseSchema to baseSchemaRoutes; consumers must update function parameter usage 💥

## 1.9.4

### Patch Changes

- 5c6900d: fix: faulty error resolution

## 1.9.3

### Patch Changes

- 7d4765f: fix(route-method): fixed issue with route method extraction

## 1.9.2

### Patch Changes

- 991ac01: refactor(callapi/hooks): make hook registries use lazy instantiation instead of having to deep copy with structured clone🧩

   chore(deps): update workspace package.json files and sync pnpm-lock.yaml 📦🔒

## 1.9.0

### Minor Changes

- 9627f3e: refactor(plugins): rename `init` to `setup` and improve type safety

   ♻️ refactor(plugins): rename `PluginInitContext` to `PluginSetupContext` and `init` hook to `setup`
   ✨ feat(types): enhance type safety in response handling
   🔧 fix(types): improve generic type handling in response parsers
   📝 docs: update plugin documentation to reflect API changes

   feat(url): ✨ enhance URL parameter handling and dedupe logic
   - 🛠️ Improve URL parameter merging for both array and object params
   - 🔄 Support both `:param` and `{param}` URL parameter patterns
   - 🧹 Clean up and optimize dedupe cache implementation
   - 🏗️ Update page actions with better caching and error handling
   - 📝 Update related documentation and examples

## 1.8.22

### Patch Changes

- 00c0d7f: refactor: update to internal dedupe structure

## 1.8.21

### Patch Changes

- 9f3b938: feat: update jsdocs and allow dedupe key to accept a callback

## 1.8.20

### Patch Changes

- 1de63d3: fix(types): improve type inference and schema handling

   ♻️ refactor(types): simplify type parameters and improve type safety
   ✨ feat(types): better handling of URL types in schema configuration
   🐛 fix(types): fix type inference for route keys and schema validation
   🔧 chore: update dependencies and configuration files

## 1.8.18

### Patch Changes

- 6e259a6: fix(cache): optimize global cache scope check in dedupe strategy
   - Simplify the global cache scope check condition

## 1.8.17

### Patch Changes

- ee7659d: feat(dedupe): ✨ add scoped deduplication cache with namespacing
   - feat(dedupe): add `dedupeCacheScopeKey` option for namespacing global dedupe caches
   - refactor(dedupe): improve type safety with `GlobalRequestInfoCache` type
   - fix(error): update error message reference to use `defaultHTTPErrorMessage`
   - refactor(types): add type safety with `satisfies CallApiConfig` to default options
   - chore: update error message constant name for consistency

## 1.8.15

### Patch Changes

- 03f69ce: feat(core): Add prefix support and initURL format, in anticipation for v1.9.0
  fix(dedupe): clarify duplicate-request abort wording for better DX 🐞
  chore(ci): tweak stale workflow file naming & add legacy variant 🔧
  chore(repo): update exports and minor style tweaks across modules ✨

## 1.8.12

### Patch Changes

- 360b0b7: fix: ensure schema takes precedence over path in terms of params when making it required

## 1.8.10

### Patch Changes

- 4864919: fix: pix bug in array hook merging logic

## 1.8.3

### Patch Changes

- 9d8f72d: refactor(auth): 🔄 Simplify auth header return types

   fix(auth): 🐛 Improve bearer token handling logic
   feat(dedupe): ✨ Add dedupeCacheScope option with 'local' default

## 1.8.2

### Patch Changes

- 3a150ba: feat: add isJavascriptError guard

## 1.8.0

### Minor Changes

- 7da7707: - Implementation of standard schema validation, both in runtime and at the type level
   - Ability to override any of the schemas and configs at the instance level
   - Handle errors specifically for validation failures
   - Setting up the stage for open api spec generation and usage

## 1.7.18

### Patch Changes

- eb629cf: feat(error): ✨ Add HTTPError.isError static method for better type checking
  refactor(utils): 🔄 Rename waitUntil to waitFor for better clarity
  refactor(types): 🏷️ Improve type annotations and error generics
  feat(types): 🔄 Add conditional ThrowOnErrorOption and refine ResultModeOption

## 1.7.15

### Patch Changes

- 434dec2: ✨ result: Introduce allWithoutResponse variants using omitKeys utility
  📦 core: Add new result mode types to handle response-excluded scenarios

## 1.7.14

### Patch Changes

- ce8ba66: 🐛 fix(types): improve type safety in guards and type helpers
  📄 docs(comparisons): update documentation with latest framework comparisons
  🔄 refactor(validation): streamline schema validation with zod v3.24.4
  📦 chore(pnpm): update lockfile with latest package versions

## 1.7.10

### Patch Changes

- dc9ae65: feat(error-handling): ✨ replace error.ts with result.ts introducing Result type
  fix(auth): 🚑 make header resolution async in mergeAndResolveHeaders
  chore(deps): 🔧 update type guards to reference new result module
  refactor(types): ♻️ consolidate conditional types and common type utils
  fix(headers): 🚑 handle async auth header generation
  types(guards): 🏷️ update PossibleHTTPError imports to use result.ts

## 1.7.6

### Patch Changes

- 83160f4: fix(hooks): re-add support for merge base and instance hooks if the base is an array
  refactor(core): Move constants to dedicated directory
  refactor(types): Improve type definitions and conditional types
  chore(cleanup): Remove deprecated constants file
- e81116a: refactor(retry)!: revamp retry system with improved type safety and flexibility 🔄 ⚡️

   feat(retry): add function support for retry delay configuration 🎛️
   feat(retry): make attempts required in InnerRetryOptions 🔒
   feat(retry): add UnmaskType utility for better type inference 🎯
   refactor(retry): rename ~retryCount to ~retryAttemptCount for clarity 📝
   refactor(retry): move retry constants to retry.ts for better organization 🏗️
   refactor(retry): improve retry strategy handling with switch statement 🔀
   refactor(retry): enhance status code and method checking with Set 🚀
   chore(deps): update @zayne-labs/toolkit-type-helpers to 0.9.33 📦

## 1.7.4

### Patch Changes

- f211571: feat(hooks): add config and baseConfig to context.
  feat(options): rename option to "skipAutoMerge"
  refactor(docs): 📚 Update documentation for hooks and options
  feat(core): ✨ Move all hook related features to a new hooks.ts module
  refactor(core): ♻️ Remove polyfills.ts and logo assets
  chore(deps): ⬆️ Upgrade @types/node and other dependencies

## 1.7.1

### Patch Changes

- 52a1573: feat(core): 🚀 Add option for skipping default options merge

   feat(types): 🏷️ Update common types and conditional type utilities
   chore(deps): 📦 Update package dependencies across monorepo

## 1.7.0

### Minor Changes

- f95b8ac: 🔄 refactor(core): comprehensive HTTP client overhaul with streaming support

   docs: update docs to include new hooks

   feat(stream): add streaming request capabilities and utilities
   feat(plugins): enhance plugin system with improved interceptor pattern
   refactor(utils): reorganize type guards and utility functions
   chore(deps): update package dependencies and lockfile

## 1.6.24

### Patch Changes

- a93d849: fix(callapi): 🐛 refactor error handling logic in createFetchClient
  refactor(callapi): ♻️ clean up nested error handling code

## 1.6.16

### Patch Changes

- e5f13e3: feat: cleaned things up a bit

## 1.6.9

### Patch Changes

- 6093711: feat: abstract validation and add new resultMode for allWithoutResponse

   This commit introduces data validation for both success and error responses using schemas and validators. It also refactors error handling to provide more context and flexibility.
   - Implemented `handleValidation` function to validate response data against schemas and validators.
   - Modified `createFetchClient` and `createFetchClientWithOptions` to include validation of success and error data.
   - Updated `resolveErrorResult` to provide more detailed error information.
   - Refactored dedupe strategy to improve readability and maintainability.
   - Added `omitKeys` and `pickKeys` utility functions for object manipulation.
   - Updated types and contexts to reflect the changes in error handling and validation.
   - Increased size limit in `package.json` to accommodate the new features.

## 1.6.7

### Patch Changes

- 2ed893e: fix(callapi): fix serializer bug that prevented the body object from being stringified internally

## 1.6.0

### Minor Changes

- d378e41: feat: add generic argument support and inference for response type

## 1.5.1

### Patch Changes

- 301715a: refactor(types)!: ♻️ 🏗️ make schema errors intuitive and easy to disable by including undefined

## 1.5.0

### Minor Changes

- 7c29408: feat: add support for validating every request detail via schemas

## 1.4.4

### Patch Changes

- 233b2b7: 🔧 fix(types): initialize plugin type generic with never to remove type errors

## 1.4.0

### Minor Changes

- 00440df: feat(core)!: ✨ add schema validation with standard-schema support
  chore(deps):⬆️ upgrade pnpm to 10.2.1
  docs(error-handling): 📝 improve error handling docs
  style(docs): 🎨 update docs UI and improve navigation
  fix(docs): 🔗 update broken links in README files

## 1.3.5

### Patch Changes

- bf6002b: chore(deps): ⬇️ downgrade fumadocs packages due to failed tailwind migration
  feat(exports): ✨ expose retry constants from utils
  chore(eslint): 🔧 enable tailwindcss config validation

## 1.3.3

### Patch Changes

- 621f15f: fix: improve types

## 1.3.1

### Patch Changes

- ed6412d: fix: fix type issues with interceptor
  feat: allow plugin hooks to also be arrays

## 1.3.0

### Minor Changes

- cbedc52: 🔄 refactor(retry): rename retryCodes to retryStatusCodes for clarity ✨ feat(retry): add POST to default retry methods
  📝 docs(hooks): reorganize hooks documentation for better readability 🗑️ refactor(docs): merge retries.mdx into timeout-and-retries.mdx

## 1.2.1

### Patch Changes

- 28b68df: 🔧 fix(fetch): remove fullURL option from request options to extra-options

## 1.2.0

### Minor Changes

- 0f333f7: feat(core): ✨ Add retry functionality and enhance core components

   feat(docs): 📚 Update documentation structure and title

   chore(types): 🏗️ Refactor type definitions and utilities

## 1.1.0

### Minor Changes

- 4ff75bc: feat!: rename requestKey to dedupeKey

## 1.0.0

### Major Changes

- 445c87b: release(packages): 🚀 official bump of @zayne-labs/callapi and @zayne-labs/callapi-legacy to v1.0.0

## 1.0.0-rc-20240920162427

### Major Changes

- [BREAKING]: removal of the `cancelRedundantRequest` option, replaced with the more robust `dedupeStrategy`
- Add params feature
  Add dedupe feature
  Upgrade caching heuristics
  Deprecate cancelRedundantRequests option
  Stabilize current API

## 0.8.0

### Minor Changes

- a620848: reformated onError interceptor's error object to be consistent with the one from callapi

### Patch Changes

- 210abd2: added types for headers

## 0.7.9

### Patch Changes

- 0061a16: added types for headers

## 0.7.8

### Patch Changes

- 343989e: fix typo in error message for abort

## 0.7.7

### Patch Changes

- 75d00c5: allow null as a valid auth value

## 0.7.6

### Patch Changes

- c6e6b12: used isObject over isString for auth option
- c6e6b12: simplified a few types

## 0.7.5

### Patch Changes

- 0111f54: revert null check
- 4eb6978: fix params error message

## 0.7.4

### Patch Changes

- 45ac33b: handled null cases for empty objects in query params

## 0.7.3

### Patch Changes

- 52493b1: retrying failed deployment
- 8cdd379: fix ci
- c78dea9: update with provenance

## 0.7.3

### Patch Changes

- bfb97aa: update with provenance
- 3de7baf: add provenance tag to publish command

## 0.7.2

### Patch Changes

- eb3fecf: a few bug fixes

## 0.7.1

### Patch Changes

- 61bb5a9: update bundling and exports

## 0.7.0

### Minor Changes

- 2df4132: feat: made requestKey to be a combination of options and url
  ![BREAKING] - removed cancel property from callApi

### Patch Changes

- 5ec6d9b: improve types

## 0.6.0

### Minor Changes

- 37a6d8e: added a new interceptor that runs both onResponse and onRequestErrors

## 0.5.4

### Patch Changes

- eebc2a8: create isQueryString Utility, update docs

## 0.5.3

### Patch Changes

- 0d83e43: removed manual headers handling for only formData

## 0.5.2

### Patch Changes

- 5aaa7b5: fix success response returning errorInfo instead error

## 0.5.1

### Patch Changes

- cad5d81: fixed a bug in fetch creator

## 0.5.0

### Minor Changes

- 6ec8f12: Add cloneResponse Option to callApi

## 0.4.7

### Patch Changes

- 38d444d: update docs

## 0.4.6

### Patch Changes

- 5ae2242: upgrade engines field to node 18.17.x

## 0.4.5

### Patch Changes

- 566fb56: added reason option to cancel method

## 0.4.4

### Patch Changes

- 7d732a1: Improvements to AbortError messages

## 0.4.3

### Patch Changes

- 19ac795: lil change to merge util

## 0.4.2

### Patch Changes

- 4240557: Add Documentation website

## 0.4.1

### Patch Changes

- c98edc8: Add Documentation website

## 0.4.0

### Minor Changes

- dc92197: changed errorName to just name

## 0.3.4

### Patch Changes

- b21eb8b: refactored httpError class to better support response object.assign

## 0.3.3

### Patch Changes

- d36c285: removed abort.any type cast
- ffffc02: fixed the respone spread issue

## 0.3.2

### Patch Changes

- f2762ec: improve types for auth

## 0.3.1

### Patch Changes

- 7a27edd: provided a response clone to the getResponseData function, to prevent bodyused errors when user tries to call res.whatever() in interceptor

## 0.3.0

### Minor Changes

- aaa3951: Improved error handling experience, as well as the docs

## 0.2.7

### Patch Changes

- 9190d6a: add separate configs for esm and cjs, with diff folders

## 0.2.6

### Patch Changes

- 2d418c5: remove src dir from dist

## 0.2.5

### Patch Changes

- 2c8dbd6: add support for token version of auth header, also updated docs

## 0.2.4

### Patch Changes

- 5e35ac4: expanded conditional types in pkg.json to resolve to proper types

## 0.2.3

### Patch Changes

- 3907e38: update types in pkg.json

## 0.2.2

### Patch Changes

- b448415: fix: update entry points

## 0.2.1

### Patch Changes

- da4d300: chore: update build dir structure

## 0.2.0

### Minor Changes

- 66c4dad: feat: added option for adding custom validator function

### Patch Changes

- 66c4dad: refactor: exposed createFetchClient function for users who prefer it

## 0.1.1

### Patch Changes

- f2e0417: fix: fix build by adding missing entry

## 0.1.0

### Minor Changes

- 9128630: feat: added a new feature for auth tokens
- 9128630: Updated a few types and parts of the api to be more user friendly

### Patch Changes

- 9128630: docs: added proper docs to readme

## 0.0.6

### Patch Changes

- 2f2c22c: add main entry point via pkg.json

## 0.0.5

### Patch Changes

- 7e3fd59: fix: update package.json to better resolve necessary files and update typescript version

## 0.0.4

### Patch Changes

- a9f7824: changed package.json files property to hold src files instead of dist

## 0.0.3

### Patch Changes

- dfbadb2: fix: removed clone calls from reponse to prevent crashing

## 0.0.2

### Patch Changes

- 6922422: feat: added more paths to entry
