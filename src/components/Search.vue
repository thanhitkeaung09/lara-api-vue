<template>
    <div>
        <input v-model="keyword"  type="search" id="search-dropdown" class=" block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 border-l-gray-300" placeholder="Search" required>
        <button @click="search" type="submit" class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white rounded-r-lg border border-blue-700 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bg-black"><svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'
import {throttle,debounce} from "lodash"

export default {
    setup (props,context) {
        let keyword = ref(null)
    

        let search = () =>{
            // console.log(keyword.value)
            context.emit("search",keyword.value)
        }

        // let search = throttle(function(){
        //     context.emit("search",keyword.value)
        // },500)

          // let search = debounce(function(){
        //     context.emit("search",keyword.value)
        // },500)

        // watch(keyword,()=>{
        //     // console.log(keyword.value)
        //     context.emit("search",keyword.value)

        // })

        // watch(keyword,throttle(function(){
        //     context.emit("search",keyword.value)
        // },500))


        watch(keyword,debounce(function(){
            context.emit("search",keyword.value)
        },500))


        return {keyword,search}
    }
}
</script>

<style lang="scss" scoped>

</style>