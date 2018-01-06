import typescript from 'typescript';
import typescriptPlugin from 'rollup-plugin-typescript';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: './src/index.ts',
  name: 'webdriver-page-object',
  plugins: [
    nodeResolve({
      jsnext: true
    }),
    commonjs(),
    typescriptPlugin({
      typescript: typescript
    })
  ],

  output: {
    file: 'dist/index.js',
    format: 'cjs'
  }
};
