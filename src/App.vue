<template>
  <div id="app">
    <Game/>
  </div>
</template>

<script>
import Game from "./components/Game";

export default {
  name: 'App',
  components: {
    Game
  }
}
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    .button {
        text-decoration: none;
        color: #fff;
        background-color: #26a69a;
        text-align: center;
        letter-spacing: .5px;
        border: 0;
        padding: 10px 20px;
        cursor: pointer;
        outline: none;
    }
</style>
