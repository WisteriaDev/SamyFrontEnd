<template>
  <div class="app">
  </div>
  <router-view/>
</template>

<script lang="ts">

</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Atma:wght@700&family=Lexend:wght@500;600;800&display=swap');

  body{
        background-color: #2F2F2F;
        padding: 0;
        margin: 0;
    }

  .button--disabled {
    background:#cecece !important;
    color:#ececec !important;
    filter: none !important;
    cursor: not-allowed !important;
    transition: background-color 0.5s ease;
    filter: drop-shadow(0px 5px 0px #cecece);
  }

* {
  transition: all 0.5s ease;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

</style>
