module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'commonJS': '@/common/js',
        'commonCSS': '@/common/css',
        'commonFONT': '@/common/font',
        'cnpmB': '@/components/base',
        'cnpmC': '@/components/content',
        'network': '@/network'
      }
    }
  },
  // 开启eslint 语法检测
  lintOnSave: !true
}