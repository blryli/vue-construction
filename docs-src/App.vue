<template>
  <div id="app">
    <header>
      <div>{{ name }}</div>
    </header>

    <router-view />

  </div>
</template>

<script>
import routes from './views/routes'
import { name } from './config'

export default {
  data() {
    return {
      routes: routes.filter(route => route.path.length > 1),
      name
    }
  }
}
</script>

<style lang="scss">
body {
  background: white;
  margin: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header {
  background: #f5f5f5;
  height: 80px;
  line-height: 80px;
  font-size: 30px;
  color: $primary-color;
  text-align: center;
}
</style>
