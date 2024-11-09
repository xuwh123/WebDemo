const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/api':{
        target:'http://localhost:5080',
        pathRewrite:{'^/api':''},
        changeOrigin:true
      }
    }
  }
})
