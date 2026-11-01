import tsParser from '@typescript-eslint/parser';

const HEX_COLOR_REGEX = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/;

const noHardcodedHexRule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow hardcoded hex color values outside src/theme/',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
  },
  create(context) {
    const filename = context.filename || context.getFilename();
    // Allow hex values inside theme directory
    if (filename.includes('/src/theme/') || filename.includes('\\src\\theme\\')) {
      return {};
    }

    function checkValue(node, str) {
      if (!str || typeof str !== 'string') return;
      // Ignore anchors or SVG clip-path/mask references like url(#id) or #heading
      if (str.startsWith('#') && !/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(str)) {
        return;
      }
      // Ignore web URLs with hash fragments (e.g. https://...#2215)
      if (str.includes('://')) return;
      if (str.includes('url(#')) return;

      const match = str.match(HEX_COLOR_REGEX);
      if (match) {
        context.report({
          node,
          message: `Hardcoded hex color '${match[0]}' is disallowed outside src/theme. Replace with a theme token from src/theme.`,
        });
      }
    }

    return {
      Literal(node) {
        checkValue(node, node.value);
      },
      TemplateElement(node) {
        checkValue(node, node.value.raw);
      },
    };
  },
};

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'build/**', '.aistudio/**', 'scripts/**', 'src-tauri/**'],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      theme: {
        rules: {
          'no-hardcoded-hex': noHardcodedHexRule,
        },
      },
    },
    rules: {
      'theme/no-hardcoded-hex': 'error',
    },
  },
];
