<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import './assets/scss/basic.scss';

#app {
  width: 576px;
  padding: 0 19px;
}

@media screen and (min-width: 992px) and (max-width: 1199px) {
  #app {
    width: 100%;
    padding: 100px 16px;
  }
}

@media screen and (min-width: 1200px) {
  #app {
    width: 100%;
    padding: 100px 130px;
  }
}
</style>
