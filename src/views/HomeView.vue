<template>
  <div>
      <h1>This is Home</h1>
      <h1>This is piania {{store.myName}}</h1>
      <h1>{{store.upperName}}</h1>
  </div>
</template>

<script>
import { useCounterStore } from '../stores/counter';

export default {
  setup () {

    
      let store = useCounterStore();

    return {store}
  }
}
</script>

<style lang="scss" scoped>

</style>