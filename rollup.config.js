import path from 'path';
// ts -> 编译
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

// 发下 rollup 处理其他支援并不理想，这里适用
/*
// 使rollup可以使用postCss处理样式文件less、css等
import postcss from 'rollup-plugin-postcss';
// 处理css定义的变量
import simplevars from 'postcss-simple-vars';
// 处理less嵌套样式写法
import nested from 'postcss-nested';
// 可以提前适用最新css特性
import postcssPresetEnv from 'postcss-preset-env';
// css代码压缩
import cssnano from 'cssnano';

// 可以处理组件中import图片的方式，将图片转换成base64格式，但会增加打包体积，适用于小图标
import image from '@rollup/plugin-image';
*/

export default {
    input: 'src/main.tsx',
    output: [{
        file: path.resolve(__dirname, pkg.main),
        format: 'cjs',
        globals: {
            'react': 'React'
        },
    }, {
        file: path.resolve(__dirname, pkg.module),
        format: 'es',
        globals: {
            'react': 'React'
        },
    }, {
        file: path.resolve(__dirname, pkg.unpkg),
        format: 'umd',
        name: 'demo',
        globals: {
            'react': 'React'
        },
    }, {
        file: path.resolve(__dirname, pkg.browser),
        format: 'umd',
        name: 'demo',
        plugins: [terser()],
        globals: {
            'react': 'React'
        },
    }],
    external: ['react'], // 屏蔽要打入的包
    plugins: [
        typescript(),
        commonjs(),
        resolve(),
        // postcss({
        //     plugins: [
        //         simplevars(),
        //         nested(),
        //         postcssPresetEnv(),
        //         cssnano(),
        //     ],
        //     // 处理.css和.less文件
        //     extensions: ['.css', 'less'],
        // }),
        // image(),
    ]
};
