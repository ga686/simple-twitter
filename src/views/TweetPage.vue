<template>
  <main class="main-view">
    <NavbarLeft />
    <div class="tweet_list_home">
      <div class="tweet_list_home-title">
        <h4>推文</h4>
      </div>
    </div>
    <SuggestUser />
  </main>
</template>
<script>
import NavbarLeft from "../components/NavbarLeft"
import SuggestUser from "../components/SuggestUser"

export default{
  components: {
    NavbarLeft,
    SuggestUser
  }
}
</script>
