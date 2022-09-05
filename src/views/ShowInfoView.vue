<template>
    <div class="mt-5" >



<div id="popup-modal" v-for="(item,index) in datas" :key="index"  tabindex="-1" class="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center flex" aria-modal="false" role="dialog">
    <div class="relative p-4 w-full max-w-md h-full md:h-auto">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button @click="changeShowData" type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                <svg  aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="p-6 text-center">
                <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <h1 class=" text-lg font-normal text-gray-500 dark:text-gray-400">Item Name : {{item.name}}</h1>
                <p class=" text-lg font-normal text-gray-500 dark:text-gray-400" >Price : {{item.price}} mmk</p>
                <p class=" text-lg font-normal text-gray-500 dark:text-gray-400" >Stock : {{item.stock}} {{item.stock_status}}</p>
                <p class=" text-lg font-normal text-gray-500 dark:text-gray-400" >Owned By : {{item.owner.name}}</p>
             
            </div>
        </div>
    </div>
</div>

    </div>

    <!-- <div class="" v-for="(item,index) in datas" :key="index" >
        <h1>{{item}}</h1>
    </div> -->
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
export default {
    props:['datas','allData'],
    setup (props,context) {
        let boolean = ref(false)
        
        onMounted(()=>{

        })

        let changeShowData = () =>{
            // console.log("hello")
            context.emit("changeShowData",boolean)
        }
        return {changeShowData,boolean}
    }
}
</script>

<style lang="scss" scoped>

</style>