import typescript from 'typescript';
import typescriptPlugin from 'rollup-plugin-typescript';
import nodeResolve from 'rollup-plugin-node-resolve';


export default {
  entry: './src/index.ts',

  plugins: [
    nodeResolve({
      jsnext: true
    }),
    typescriptPlugin({
      typescript: typescript
    })
  ],

  output: {
    file: 'dist/index.js',
    format: 'cjs'
  }
};
