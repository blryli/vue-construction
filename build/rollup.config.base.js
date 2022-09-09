import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import cjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

const config = require('../package.json')

const { name, version } = config
const file = type => `dist/${name}.${type}.js`

export { name, file }

export default {
  input: 'packages/index.js',
  plugins: [
    resolve({
      mainFields: ['module', 'jsnext:main', 'main', 'browser']
    }),
    vue({
      scss: true
    }),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue']
    }),
    cjs(),
    replace({
      VERSION: JSON.stringify(version)
    })
  ],
  watch: {
    include: 'packages/**'
  }
}
