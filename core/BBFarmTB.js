/*
 * @Author: TonyJiangWJ
 * @Date: 2020-04-25 16:46:06
 * @Last Modified by: zj
 * @Last Modified time: 
 * @Description: 
 */

let { config } = require('../config.js')(runtime, this)
let singletonRequire = require('../lib/SingletonRequirer.js')(runtime, this)
let commonFunctions = singletonRequire('CommonFunction')
let alipayUnlocker = singletonRequire('AlipayUnlocker')
let widgetUtils = singletonRequire('WidgetUtils')
let logUtils = singletonRequire('LogUtils')
let automator = singletonRequire('Automator')
let FloatyInstance = singletonRequire('FloatyUtil')
let BaseSignRunner = require('./BaseSignRunner.js')

function SignRunner () {
  BaseSignRunner.call(this)

  let bb_farm_config = config.bb_farm_config

  this.exec = function () {
    this.executeTaobaoFarm()
    this.setExecuted()
  }

  this.executeTaobaoFarm = function () {
    FloatyInstance.setFloatyPosition(400, 400)
    FloatyInstance.setFloatyText('准备打开淘宝芭芭农场页面')
    this.openTaobaoFarm()
    // this.captureAndCheckByImg(bb_farm_config.collect_btn_alipay, '每日签到', null, true)
    // sleep(1000)
    // // 签到任务
    // this.collectAlipayTask()
    // // TODO 更多的逛一逛任务
    // // 打开
    // // this.executeTaobaoFarm()

    // commonFunctions.minimize('com.eg.android.AlipayGphone')
  }

  this.openTaobaoFarm = function () {

    let _package_name = 'com.taobao.taobao'
    commonFunctions.launchPackage(_package_name)

    // sleep(500)
    // FloatyInstance.setFloatyText('校验是否有打开确认弹框')
    // let confirm = widgetUtils.widgetGetOne(/^打开$/, 3000)
    // if (confirm) {
    //   this.displayButtonAndClick(confirm, '找到了打开按钮')
    // } else {
    //   FloatyInstance.setFloatyText('没有打开确认弹框')
    // }

    // this.checkForTargetImg(bb_farm_config.entry_check_alipay, '农场加载校验')
  }


  // this.executeTaobaoFarm = function () {
  //   // this.launchTaobao()
  //   let entry = widgetUtils.widgetGetOne('前往手机淘宝-芭芭农场')
  //   if (entry) {
  //     FloatyInstance.setFloatyText('打开淘宝芭芭农场')
  //     sleep(1000)
  //     entry.click()
  //     sleep(1000)

  //     let welcomBtn = widgetUtils.widgetGetOne('继续努力')
  //     if (welcomBtn) {
  //       automator.clickCenter(welcomBtn)
  //       sleep(1000)
  //     }

  //     this.checkForTargetImg(bb_farm_config.entry_check_taobao, '农场加载校验')

  //     this.captureAndCheckByImg(bb_farm_config.collect_btn_taobao, '每日签到', null, true)

  //     this.collectTaobaoTask()

  //     commonFunctions.minimize('com.taobao.taobao')
  //   }
  // }

  this.collectTaobaoTask = function () {

    this.captureAndCheckByImg(bb_farm_config.task_btn_taobao, '每日任务', null, true)
    sleep(1000)
    let collect = widgetUtils.widgetGetOne('去签到')
    if (collect) {
      FloatyInstance.setFloatyInfo({ x: collect.bounds().x, y: collect.bounds().y }, '去签到')
      sleep(1000)
      collect.click()
    }
  }

  this.launchTaobao = function () {
    let _package_name = 'com.taobao.taobao'
    app.launch(_package_name)
    sleep(500)
    FloatyInstance.setFloatyText('校验是否有打开确认弹框')
    let confirm = widgetUtils.widgetGetOne(/^打开|允许$/, 3000)
    if (confirm) {
      this.displayButtonAndClick(confirm, '找到了打开按钮')
    } else {
      FloatyInstance.setFloatyText('没有打开确认弹框')
    }
  }
}

SignRunner.prototype = Object.create(BaseSignRunner.prototype)
SignRunner.prototype.constructor = SignRunner

module.exports = new SignRunner()
