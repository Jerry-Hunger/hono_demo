import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  ignores: ["**/migrations/*"],
  formatters: {
    // 启用 Prettier 兼容模式
    prettier: true
  },
  rules: {
    // 缩进和引号与 Prettier 对齐
    'style/no-tabs': 'off',
    'style/indent': 'off',
    'style/quotes': ['error', 'single'],
    'no-console': 'warn',
    // 允许在配置文件中使用 process.env
    'node/no-process-env': 'off',
    'node/prefer-global/process': 'off',
    // 关闭导入顺序检查
    'perfectionist/sort-imports': 'off',
    // 忽略尾逗号的检查
    'style/comma-dangle': 'off',
    // 忽略箭头函数参数括号检查
    'style/arrow-parens': 'off',
    // 忽略 TypeScript 导入类型方式检查
    'ts/consistent-type-imports': 'off',
    // 忽略 TypeScript 类型定义方式检查（允许使用 type 而不强制 interface）
    'ts/consistent-type-definitions': 'off'
  }
})