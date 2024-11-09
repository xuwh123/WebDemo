const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/pet':{
        target:'https://apifoxmock.com/m1/467205-1183271-default/',
        pathRewrite:{'^/api':''},
        changeOrigin:true
      }
    }
  }
})

