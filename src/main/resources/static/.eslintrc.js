module.exports = {
  "parser": "babel-eslint",

  "extends": ["eslint:recommended", "plugin:react/recommended"],

  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "impliedStrict": true,
      "jsx": true
    }
  },

  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true,
    "jquery": true
  },

  "plugins": [
    "react"
  ],

  "globals": {
    "define": true
  },

  "import/ignore": [
    "\\.(scss|less|css)$"
  ],

  "rules": {
    "comma-dangle": "error",
    "no-cond-assign": "error",
    "no-console": "warn",
    "no-constant-condition": "error",
    "no-control-regex": "error",
    "no-debugger": "warn",
    "no-dupe-args": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-empty": "error",
    "no-empty-character-class": "error",
    "no-ex-assign": "error",
    "no-extra-boolean-cast": "error",
    "no-extra-parens": "off",
    "no-extra-semi": "error",
    "no-func-assign": "error",
    "no-inner-declarations": "error",
    "no-invalid-regexp": "error",
    "no-irregular-whitespace": ["error", {
      "skipStrings": true,
      "skipTemplates": true
    }],
    "no-negated-in-lhs": "error",
    "no-obj-calls": "error",
    "no-regex-spaces": "error",
    "no-sparse-arrays": "error",
    "no-unexpected-multiline": "error",
    "no-unreachable": "error",
    "no-unsafe-finally": "error",
    "use-isnan": "error",
    "valid-jsdoc": "off",
    "valid-typeof": "error",

    "react/wrap-multilines": "error",
    "react/forbid-prop-types": ["error", { "forbid": ["any"] }],
    "react/jsx-boolean-value": "warn",
    "react/jsx-closing-bracket-location": "off",
    "react/jsx-curly-spacing": "warn",
    "react/jsx-indent-props": "off",
    "react/jsx-key": "warn",
    "react/jsx-max-props-per-line": "off",
    "react/jsx-no-bind": "off",
    "react/jsx-no-literals": "off",
    "react/jsx-pascal-case": "warn",
    "react/jsx-sort-prop-types": "off",
    "react/jsx-sort-props": "off",
    "react/no-multi-comp": "warn",
    "react/no-set-state": "off",
    "react/prefer-es6-class": "warn",
    "react/require-extension": "warn",
    "react/self-closing-comp": "warn",
    "react/sort-comp": ["error", {
      order: [
        'static-methods',
        'lifecycle',
        '/^on.+$/',
        'everything-else',
        'render',
        '/^render.+/'
      ]
    }]
  }
}
