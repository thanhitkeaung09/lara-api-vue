<template>
    <div class="w-[30%] mx-auto" >
       
            <form action="" @submit.prevent="update"  class="grid grid-cols-4" ref="createForm">
                
                <div class="col-span-4  mb-5">
                    <label  for="" class="text-[18px]">Product Name</label>
                    <input v-if="sigleData.value"  :class="{'bg-red-50':hasError}" type="text" class="w-full rounded-lg mt-2 " placeholder="Name" name="name" :value="sigleData.value.name">
                    <p class="text-red-500 mt-2" v-for="(item,index) in validationError"  :key="index">{{item.name ? item.name.toString() : ""}}</p>

                </div>

                <div class="col-span-4  mb-5">
                    <label  for="" class="text-[18px]">Price</label>
                    <input v-if="sigleData.value" :class="{'bg-red-50':hasError}" type="text" class="w-full rounded-lg mt-2 " placeholder="Price" name="price" :value="sigleData.value.price">
                    <p class="text-red-500 mt-2" v-for="(item,index) in validationError" :key="index">{{item.price ? item.price.toString() : ""}}</p>


                </div>

                <div class="col-span-4  mb-5">
                    <label  for="" class="text-[18px]">Stock</label>
                    <input v-if="sigleData.value" :class="{'bg-red-50':hasError}" type="text" class="w-full rounded-lg mt-2 " placeholder="Stock" name="stock" :value="sigleData.value.stock" >
                    <p class="text-red-500 mt-2" v-for="(item,index) in validationError" :key="index">{{item.stock ? item.stock.toString() : ""}}</p>


                </div>

                <div class="col-span-4  mb-5">
                    <label  for="" class="text-[18px]">Photos</label>
                    <input :class="{'bg-red-50':hasError}" type="file" class="w-full rounded-lg mt-2 border border-black" placeholder="Photos" name="photos[]" multiple>
                    <p class="text-red-500 mt-2" v-for="(item,index) in validationError" :key="index">{{item.photos ? item.photos.toString() : ""}}</p>


                </div>

                

                <div class="mt-5 col-span-4 text-end">
                    <button type="submit" class="w-[30%] focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" >Update</button>
                </div>
            </form>
      
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import axios from "axios"
import { useCounterStore } from '../stores/counter'
import {  onMounted, onUpdated } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'
export default {
    props : ['id'],
    setup () {
        let sigleData = reactive({})
        let route = useRoute()
        let router = useRouter()

        console.log(route.params.id)
        onMounted(()=>{
            axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem('token');
            store.hideLogReg()
            store.showUser()

        })

        onMounted(()=>{
            axios.get(store.apiUrl+'products/'+route.params.id)
            .then((res)=>{
                console.log(res.data.data)
                sigleData.value = res.data.data
            })
            .catch((err)=>{
                console.log(err)
            })
            .finally(()=>{
                console.log("this is finally")
            })
        })

     

        let store = useCounterStore()
        
    

        let createForm = ref()
        let validationError = reactive({})
        let hasError = ref(false);

  


        

        let update = () =>{
            

        let formData = new FormData(createForm.value);
            console.log()
        axios.put(store.apiUrl+'products/'+route.params.id, new URLSearchParams(formData).toString())
        .then(function (response) {
       
            router.push({name:'productList'})
            console.log(response);
            
        })
        .catch(function (error) {
            validationError.value = error.response.data.errors
            hasError.value = true
            let obj = error.response.data.errors;

        })
        .finally(()=>{
            console.log("this is finally")

        })      
        }

        

        return {createForm,update,validationError,hasError,sigleData}
    }
}
</script>

<style lang="scss" scoped>

</style>