<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <DemoTest msg="Welcome to Your Vue.js App" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import DemoTest from "./components/DemoTestNew.vue";

export default {
  name: "App",
  components: {
    // HelloWorld,
    DemoTest: DemoTest,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
