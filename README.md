# vue-bus
[![awesome-vue](https://img.shields.io/badge/Vue.js-AWESOME-ff69b4.svg)](//github.com/vuejs/awesome-vue)
[![license](https://img.shields.io/github/license/fffixed/vue-bus.svg)](//opensource.org/licenses/MIT)

A tiny simple central event bus plugin for [Vue.js](//vuejs.org) (requires Vue >= 2.0).

The plugin realise [Non Parent-Child Communication](//vuejs.org/v2/guide/components.html#Non-Parent-Child-Communication).

_(655 byte gzip)_

## Installation
Download and use with your build system
```javascript
import VueBus from 'vue-bus'
// ... maybe ...
var VueBus = require('vue-bus')

// ...  and  ...

Vue.use(VueBus)
```
Or just include it with a script tag
```html
<script src="/vue-bus.js"></script>
```
:sparkles:

## Usage
direct way:
```javascript
// in component A's method
this.$bus.$emit('my-event', 1)

// in component B's created hook
this.$bus.$on('my-event', function(arg) {
  // ...
})

//And don't forget to use "this.$bus.$off" to remove unnecessary listeners.
```

magic way:
```javascript
// in component A's method
this.$bus=['my-event', 1]

// in component B create $bus option
methods: { /* ... */ },
$bus: {
  'my-event': function(arg) {
    // ...
  }
}
```

## License
[MIT](//opensource.org/licenses/MIT)

Copyright (c) 2017 fffixed
