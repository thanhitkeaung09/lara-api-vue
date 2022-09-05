<template>
  <div>
        <NavBar></NavBar>
        <RouterView></RouterView>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import { RouterView, RouterLink } from 'vue-router';
import { onMounted } from 'vue';
import { useCounterStore } from './stores/counter';
import axios from "axios"
export default {
    setup() {

      let store = useCounterStore()

      onMounted(()=>{
        store.setToken(localStorage.getItem("token"))
        store.setAuth(JSON.parse(localStorage.getItem("auth")))

        axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem('token');
        console.log("hello")
      })


        return {};
    },
    components: { NavBar }
}
</script>

<style lang="scss" scoped>

</style>