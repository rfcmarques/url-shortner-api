// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  // 1. Configuração Global e Ignores
  {
    languageOptions: {
      globals: {
        ...globals.node, // <<< MUDANÇA AQUI: Usamos as globais do Node.js
      },
    },
    ignores: ['dist/'], // <<< MUDANÇA AQUI: Ignoramos a pasta do código compilado
  },

  // 2. Regras recomendadas do ESLint base
  js.configs.recommended,

  // 3. Regras recomendadas do TypeScript
  ...tseslint.configs.recommended,

  // 4. Configuração do Prettier - TEM DE SER O ÚLTIMO!
  eslintConfigPrettier, // <<< MUDANÇA AQUI: Adicionamos o Prettier
];
