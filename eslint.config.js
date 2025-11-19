import ycs77, { GLOB_VUE } from '@ycs77/eslint-config'

export default ycs77({
  vue: true,
  typescript: true,
})
  .append({
    rules: {
      'no-console': 'off',
    },
  })
  .append({
    files: [GLOB_VUE],
    rules: {
      'vue/one-component-per-file': 'off',
    },
  })
