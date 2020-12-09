## 安装rollup以及依赖
yarn add -D rollup rollup-plugin-commonjs rollup-plugin-node-resolve  @rollup/plugin-image rollup-plugin-terser  rollup-plugin-postcss cssnano postcss-nested postcss-simple-vars postcss postcss-preset-env

// 解决rollup.js无法识别CommonJS模块
import commonjs from 'rollup-plugin-commonjs';

// resolve将我们编写的源码与依赖的第三方库进行合并
import resolve from 'rollup-plugin-node-resolve';

// 可以处理组件中import图片的方式，将图片转换成base64格式，但会增加打包体积，适用于小图标
import image from '@rollup/plugin-image';

// 压缩打包代码, 压缩打包代码（这里弃用因为该插件不能识别es的语法，所以采用terser替代）
<!-- rollup-plugin-uglify -->
import { terser } from 'rollup-plugin-terser';

// 使rollup可以使用postCss处理样式文件less、css等
import postcss from 'rollup-plugin-postcss';

// 处理css定义的变量
import simplevars from 'postcss-simple-vars';

// 处理less嵌套样式写法
import nested from 'postcss-nested'

// css代码压缩
import cssnano from 'cssnano';

## ts

    yarn add -D rollup-plugin-typescript2 typescript

## 支持老式浏览器使用babel转一下
    
    yarn add rollup-plugin-babel @babel/core @babel/preset-env @babel/preset-react -D
    rollup.config.js
        import babel from 'rollup-plugin-babel'
        {
            plugins: [
                // parse es6 react and emotion syntax
                babel({
                    exclude: 'node_modules/**'
                })
            ],
        }

    .babelrc
        {
            "presets": [
                "@babel/preset-env",
                "@babel/preset-react",
            ]
        }














安装必要的 PostCSS插件
npm install --save-dev rollup-plugin-postcss
yarn add postcss -D
yarn add autoprefixer -D

postcss({
    plugins: [
        autoprefixer({ add: true }),
        simplevars(),
        nested(),
        cssnext({ warnForDuplicates: false, }),
        cssnano(),
    ],
    extensions: ['.css', '.less'],
    // extract: "style/index.css", //css 样式独立输出路径
    use: [
        ['less', {
            javascriptEnabled: true
        }]
    ],
}),
image({
    output: `images`, // 打包后的文件
    extensions: /\.(png|jpg|jpeg|gif|svg)$/,
    limit: 8192,  // 文件大小的限制(字节)。当一个文件没有超过限制时，它将被转换为 base64字符串，否则，它将被复制到output下
    exclude: 'node_modules/**'
}),

第一个当然是我们最需要的typescript支持@rollup/plugin-typescript
@rollup/plugin-babel 用于将rollup与bable之间的无缝集成
rollup-plugin-postcss 对css预处理文件进行解析处理 less,scss
@rollup/plugin-commonjs 将CommonJS模块转换为ES6, 方便rollup直接调用
@rollup/plugin-node-resolve 对第三方模块的引入
cssnano postcss的插件
@vue/babel-plugin-jsx vue3.0 jsx 的 babel编译插件。


@rollup/plugin-image 处理图片