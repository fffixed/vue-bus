//*********************************************
//    vue-bus v0.9.1
//    (c) 2017 fffixed
//*********************************************
;(function() {


  var vueBus = {}

  vueBus.install = function (Vue) {
    var version = Number(Vue.version.split('.')[0])
    if (version < 2) return //check Vue version

    var bus = new Vue()
    
    bus = new Proxy(bus, {
      set (obj, prop, value) {
        // Prop should start with `on` and be a function
        if (!prop.startsWith('on') || typeof value !== 'function') { obj[prop] = value; return }
        obj.$on(prop.replace(/^on/i, ''), value)
      }
    })

    Object.defineProperty(Vue.prototype, '$bus', { // for "this.$bus"
      get: function () { return bus },
      set: function (evt) { // for alt way to send event (this.$bus=['event_name',arg1,arg2])
        if (typeof evt === 'string') evt = [evt]
        // if (evt instanceof Array)
        bus.$emit.apply(bus, evt)
      }
    })

    Vue.mixin({
      created: function () { //add option "$bus" instead bus.$on in created hook
        // if (this.$options.$bus !== 'object') return
        var $bus = this.$options.$bus
        for (var name in $bus) {
          // if (typeof $bus[name] === 'function')
          bus.$on(name, $bus[name].bind(this)) // register a listener for the event
        }
      },
      beforeDestroy: function () { // unreg listeners
        var $bus = this.$options.$bus
        for (var name in $bus) bus.$off(name, $bus[name].bind(this))
      }
    })
  }


  // if module
  if (typeof exports === 'object') { module.exports = vueBus; return }
  if (typeof define === 'function' && define.amd) { define([], function(){ return vueBus }); return }

  // if direct include
  if (typeof window !== 'undefined' && window.Vue) {
    window.VueBus = vueBus
    window.Vue.use(vueBus) //auto-activation
  }


})()
