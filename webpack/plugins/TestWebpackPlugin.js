const fs = require('fs');

function TestWebpackPlugin(options) {

}

TestWebpackPlugin.prototype.apply = function (compiler) {
    compiler.plugin('compilation', function (compilation, callback) {
        // compilation.plugin('normal-module-loader', function (loaderContext, module) {
        //     console.log('开始加载loader', loaderContext);
        // });
        // compilation.plugin('optimize-modules', function (modules) {
        //     console.log('开始模块优化', modules.length);
        // });
        // compilation.plugin('optimize-chunks', function (chunks) {
        //     // 这里一般只有一个块，
        //     // 除非你在配置中指定了多个入口
        //     chunks.forEach(function (chunk) {

        //         chunk.modules.forEach(function (module) {
        //            console.log('chunkmodule优化', module)
        //         });
        //     });
        // });
        // compilation.plugin('optimize-chunks', function (chunks) {
        //     console.log(chunks)
        // })
        // compilation.plugin("optimize-chunk-assets", function (chunks, callback) {
        //     chunks.forEach(function (chunk) {
        //         chunk.files.forEach(function (file) {
        //             console.log(compilation.assets[file]);
        //         });
        //     });
        //     callback();
        // });
        // compilation.plugin('after-optimize-chunk-assets', function (chunks) {
        //     // console.log('-------------', chunks.map(function (c) {
        //     //     return {
        //     //         id: c.id,
        //     //         name: c.name,
        //     //         includes: c.modules.map(function (m) {
        //     //             return m.request;
        //     //         })
        //     //     };

        //     // }));
        //     compilation.assets['sb.text'] = {
        //         source: function () {
        //             return "312";
        //         },
        //         size: function () {
        //             return 200;
        //         }
        //     }
        // });
    });
    // emit阶段
    compiler.plugin('emit', function (compilation, callback) {
        // console.log('-------------------------',compilation.getStats().toJson().chunks)
        // 探索每个块（构建后的输出）:
        compilation.chunks.forEach(function (chunk) {
            // console.log('----chunk----',chunk.source())
            chunk.modules.forEach(function (module) {
                // console.log('----module----',module.userRequest)
                module.fileDependencies.forEach(function (filepath) {
                    // 现在我们已经知道了很多的源文件结构了……
                    // console.log('----filepath----',filepath)
                });
            });

            // 探索块生成的每个资源文件名
            chunk.files.forEach(function (filename) {
                var source = compilation.assets[filename].source();
                // 得到块生成的每个文件资源的源码
                compilation.assets[filename].source = function () {
                    return source + 'console.log("神经病啊")'
                }

            });
        });

        callback();
    });
};

module.exports = TestWebpackPlugin;