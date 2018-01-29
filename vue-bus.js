//*********************************************
//    vue-bus v0.9.2
//    (c) 2017 fffixed
//*********************************************
;(function() {


  var vueBus = {}

  vueBus.install = function (Vue) {
    var version = Number(Vue.version.split('.')[0])
    if (version < 2) return //check Vue version

    var bus = new Vue()

    Object.defineProperty(Vue.prototype, '$bus', { //for "this.$bus"
      get: function () { return bus },
      set: function (evt) { //alt way to send an event (this.$bus=['event_name',arg1,arg2])
        if (typeof evt === 'string') evt = [evt]
        bus.$emit.apply(bus, evt)
      }
    })

    Vue.mixin({
      created: function () { //add option "$bus" instead bus.$on in created hook
        var $bus = this.$options.$bus
        this.$busListeners = {}
        for (var name in $bus) {
          this.$busListeners[name] = $bus[name].bind(this) //rebind and remember each declared listener
          bus.$on(name, this.$busListeners[name]) //register a listener for the event
        }
      },
      beforeDestroy: function () { //unreg listeners
        for (var name in this.$busListeners) bus.$off(name, this.$busListeners[name])
        this.$busListeners = null
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
