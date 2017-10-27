//*********************************************
//    vue-bus v0.9.1
//    (c) 2017 fffixed
//*********************************************
(function () {
  let vueBus = {}

  vueBus.install = function (Vue) {
    let version = Number(Vue.version.split('.')[0])

    // Check Vue version
    if (version < 2) {
      return
    }

    let bus = new Vue()

    /**
     * Define "$bus" property on the Vue prototype "this.$bus"
     */
    Object.defineProperty(
      Vue.prototype,
      '$bus',
      {
        /**
         * Get the bus
         *
         * @return  {Vue}  The bus
         */
        get: function () {
          return bus
        },

        /**
         * The alternative way to emit an event
         * this.$bus = ['event_name', arg1, arg2, ..., argN]
         *
         * @param  {Array|String}  eventName  The event name
         */
        set: function (event) {
          if (typeof event === 'string') {
            event = [event]
          }

          bus.$emit.apply(bus, event)
        }
      }
    )

    Vue.mixin({
      /**
       * Register listeners for each event
       */
      created: function () {
        let vm = this
        Object.keys(this.$options.$bus).each(function (name) {
          bus.$on(name, vm.$options.$bus[name].bind(vm))
        })
      },

      /**
       * Unregister listeners
       */
      beforeDestroy: function () {
        let vm = this
        Object.keys(this.$options.$bus).each(function (name) {
          bus.$off(name, vm.$options.$bus[name].bind(vm))
        })
      }
    })
  }

  // If module
  if (typeof exports === 'object') {
    module.exports = vueBus
    return
  }

  if (typeof define === 'function' && define.amd) {
    define([], function () { return vueBus })
    return
  }

  // If direct include
  if (typeof window !== 'undefined' && window.Vue) {
    window.VueBus = vueBus
    window.Vue.use(vueBus) // Auto-activation
  }
})()
