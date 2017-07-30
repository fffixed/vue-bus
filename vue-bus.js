//*********************************************
//    vue-bus v0.9
//    (c) 2017 fffixed
//*********************************************
;(function() {


  var vueBus = {}

  vueBus.install = function (Vue) {
    var version = Number(Vue.version.split('.')[0])
    if (version < 2) return //check Vue version

    var bus = new Vue()

    Object.defineProperty(Vue.prototype, '$bus', { // for "this.$bus"
      get: function () { return bus },
      set: function (evt) { // for alt way to send event (this.$bus=['event_name',...args])
        if (typeof evt === 'string') evt = [evt]
        // if (evt instanceof Array)
        bus.$emit.apply(bus,evt)
      }
    })

    Vue.mixin({
      created: function () { //add option "$bus" instead bus.$on in created hook
        var onbus = this.$options.$bus
        if (typeof onbus === 'object') for (var name in onbus) {
          if (typeof onbus[name] === 'function') {
            bus.$on(name, onbus[name].bind(this)) // register a listener for the event
          }
        }
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
