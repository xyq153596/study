/**
 * 单例模式
 */

const Singleton = function () {
    let instance;

    function init() {
        /**
         * 私有参数
         */
        let _test = '私有参数'
        /**
         * 私有方法
         */
        function _privateTestFunction() {
            console.log(_test);
        }
        return {
            publicTestFunction: function () {
                console.log('公有方法');
            },
            publicTestArg: '公有参数',
            getPrivateFunction: function () {
                console.log(_test)
                return _test;
            },
            setTest: function (val) {
                _test = '私有参数' + val;
                
            }
        }
    }
    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    }

}()

let testSingleton = Singleton.getInstance();
testSingleton.publicTestFunction();
let testSingleton2 = Singleton.getInstance();
testSingleton2.setTest(3);
testSingleton2.getPrivateFunction()
testSingleton.getPrivateFunction()