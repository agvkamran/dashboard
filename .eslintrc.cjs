module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["boundaries", "import"],
    rules: {
      "boundaries/element-types": [
        2,
        {
          default: "disallow",
          rules: [
            { from: "shared", allow: ["shared"] },
            { from: "entities", allow: ["shared", "entities"] },
            { from: "features", allow: ["shared", "entities", "features"] },
            {
              from: "widgets",
              allow: ["features", "entities", "shared", "widgets"],
            },
            {
              from: "pages",
              allow: ["widgets", "features", "entities", "shared", "pages"],
            },
            {
              from: "app",
              allow: ["pages", "widgets", "features", "entities", "shared"],
            },
          ],
        },
      ],
      "import/no-unresolved": "error",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
    settings: {
      boundaries: {
        defaultIgnore: ["**/*.test.ts", "**/*.test.tsx"],
        types: [
          { type: "shared", pattern: "src/shared/**" },
          { type: "entities", pattern: "src/entities/**" },
          { type: "features", pattern: "src/features/**" },
          { type: "widgets", pattern: "src/widgets/**" },
          { type: "pages", pattern: "src/pages/**" },
          { type: "app", pattern: "src/app/**" },
        ],
      },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
  }
  