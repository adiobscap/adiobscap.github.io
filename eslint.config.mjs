import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

const securityRules = {
  rules: {
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-new-func': 'error',
    'no-script-url': 'error',
    'react/jsx-no-target-blank': 'error',
  },
};

const eslintConfig = [...nextVitals, ...nextTypeScript, securityRules];

export default eslintConfig;
