// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    // '@env' lo resuelve el plugin de babel react-native-dotenv en tiempo de build,
    // no existe como módulo físico para que ESLint lo siga.
    rules: {
      "import/no-unresolved": ["error", { ignore: ["^@env$"] }],
    },
  },
]);
