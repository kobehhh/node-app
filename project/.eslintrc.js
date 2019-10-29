module.exports = {
  root: false,
  env: {
    node: false
  },
  extends: ["plugin:vue/strongly-recommended"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // 自定义配置，html括号结束之前不需要换行符
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'never',
      },
    ],
    'no-unused-vars':'off',
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    "vue/html-self-closing": ["error",{
      "html": {
        "void": "never",
        "normal": "any",
        "component": "any"
      },
      "svg": "always",
      "math": "always"
    }]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};

