# vue-bus
A tiny simple central event bus plugin for [Vue.js](//vuejs.org) (requires Vue >= 2.0).

The plugin realise [Non Parent-Child Communication](//vuejs.org/v2/guide/components.html#Non-Parent-Child-Communication).

## Installation
Download and use with your build system, or simple include with a script tag after vue.js. :sparkles:

## Usage
direct way:
```javascript
// in component A's method
this.$bus.$emit('my-event', 1)

// in component B's created hook
this.$bus.$on('my-event', function (arg) {
  // ...
})
```

magic way:
```javascript
// in component A's method
this.$bus=['my-event', 1]

// in component B create onbus option
onbus: {
  'my-event': function(arg) {
    // ...
  }
}
```

## License
(c) 2017 fffixed
