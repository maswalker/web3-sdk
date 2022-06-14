import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import pkg from './package.json'

const external = [
  ...Object.keys(pkg.dependencies),
]

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        name: 'arc-sdk',
        file: pkg.browser,
        format: 'umd',
        sourcemap: false,
        globals: {
          'ethers': 'ethers',
          '@0xsequence/multicall': 'multicall',
          'bignumber.js': 'bignumber.js'
        },
      },
      { file: pkg.main, format: 'cjs', sourcemap: false },
      { file: pkg.module, format: 'es', sourcemap: false },
    ],
    plugins: [nodeResolve(), json(), commonjs(), typescript()],
    external,
  },
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts(), typescript()],
  },
]