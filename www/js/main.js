var Vue = require('vue')
var Resource = require('vue-resource')

Vue.use(Resource)

var app = new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue!'
      }
    })
