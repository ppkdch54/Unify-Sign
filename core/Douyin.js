// 引入常用工具方法
let { config } = require('../config.js')(runtime, global)
let singletonRequire = require('../lib/SingletonRequirer.js')(runtime, global)
let FloatyInstance = singletonRequire('FloatyUtil')
let widgetUtils = singletonRequire('WidgetUtils')
let automator = singletonRequire('Automator')
let commonFunctions = singletonRequire('CommonFunction')
let localOcrUtil = require('../lib/LocalOcrUtil.js')

// 引入基本类
let BaseSignRunner = require('./BaseSignRunner.js')
// 定义自己的签到
function SignRunner() {
    // 调用BaseSignRunner.call(this) 实现继承
    BaseSignRunner.call(this)

    // 编写自己的签到执行逻辑
    this.exec = function () {
        // 1.对于无子任务的
        // ...
        // 这里编写签到逻辑，具体可以参考其他的签到文件
        // 签到
        //用图找集肥料的位置并点击
        this.checkForTargetImg(douyin_config.make_money, '来赚钱', 5)
        this.captureAndCheckByImg(douyin_config.make_money, '来赚钱', null, true)
        // 点击签到
        this.checkForTargetImg(douyin_config.sign, '签到', 5)
        this.captureAndCheckByImg(douyin_config.sign, '签到', null, true)
        // 关掉window
        this.checkForTargetImg(douyin_config.close_window, '关掉', 5)
        this.captureAndCheckByImg(douyin_config.close_window, '关掉', null, true)
        // 广告 没有入口,用新手机来做
        this.checkForTargetImg(douyin_config.ads, '广告', 5)
        this.captureAndCheckByImg(douyin_config.ads, '广告', null, true)
        this.do_browsing()
        // 宝箱
        this.checkForTargetImg(douyin_config.open_box, '开宝箱得金币', 5)
        this.captureAndCheckByImg(douyin_config.open_box, '开宝箱得金币', null, true)
        // 关掉window
        this.checkForTargetImg(douyin_config.close_window, '关掉', 5)
        this.captureAndCheckByImg(douyin_config.close_window, '关掉', null, true)
        //安排下一次任务

        // 直接调用，标记当前任务已完成
        this.setExecuted()

    }
}
// 补充继承的模板代码
SignRunner.prototype = Object.create(BaseSignRunner.prototype)
SignRunner.prototype.constructor = SignRunner
// 将自定义签到代码export出去
module.exports = new SignRunner()