<template>
    <div class="w-[30%] mx-auto" >
       
            <form action="" @submit.prevent="create"  class="grid grid-cols-4" ref="createForm">
                
                <div class="col-span-4  mb-5">
                    <label  for="" class="text-[18px]">Product Name</label>
                    <input  :class="{'bg-red-50':hasError}" type="text" class="w-full rounded-lg mt-2 " placeholder="Name" name="name">
                    <p class="text-red-500 mt-2" v-for="(item,index) in validationError"  :key="index">{{item.name ? item.name.toString() : ""}}</p>

                </div>

                <div class="col-span-4  mb-5">
                    <label  for="" class="text-[18px]">Price</label>
                    <input :class="{'bg-red-50':hasError}" type="text" class="w-full rounded-lg mt-2 " placeholder="Price" name="price">
                    <p class="text-red-500 mt-2" v-for="(item,index) in validationError" :key="index">{{item.price ? item.price.toString() : ""}}</p>


                </div>

                <div class="col-span-4  mb-5">
                    <label  for="" class="text-[18px]">Stock</label>
                    <input :class="{'bg-red-50':hasError}" type="text" class="w-full rounded-lg mt-2 " placeholder="Stock" name="stock">
                    <p class="text-red-500 mt-2" v-for="(item,index) in validationError" :key="index">{{item.stock ? item.stock.toString() : ""}}</p>


                </div>

                <div class="col-span-4  mb-5">
                    <label  for="" class="text-[18px]">Photos</label>
                    <input :class="{'bg-red-50':hasError}" type="file" class="w-full rounded-lg mt-2 border border-black" placeholder="Photos" name="photos[]" multiple>
                    <p class="text-red-500 mt-2" v-for="(item,index) in validationError" :key="index">{{item.photos ? item.photos.toString() : ""}}</p>


                </div>

                

                <div class="mt-5 col-span-4 text-end">
                    <button type="submit" class="w-[30%] focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Create</button>
                </div>
            </form>

            <!-- <ul>
                <li v-for="(items,index) in validationError" :key="index"> -->
                    <!-- <p v-for="(item,index) in items" :key="index">{{item.toString()}}</p> -->
                    <!-- <p v-for="(item,index) in items" :key="index">{{item}}</p>
                </li>
            </ul> -->
      
    </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import axios from "axios"
import { useCounterStore } from '../stores/counter'
import {  onMounted, onUpdated } from '@vue/runtime-core'
export default {
  components: {  },
    setup () {

        onMounted(()=>{
            axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem('token');
            store.hideLogReg()
            store.showUser()
        })

     

        let store = useCounterStore()
        
    

        let createForm = ref()
        let validationError = reactive({})
        let hasError = ref(false);

  


        

        let create = () =>{
            console.log("this is create")
            console.log(createForm.value)

        let formData = new FormData(createForm.value);

        axios.post(store.apiUrl+'products', formData)
        .then(function (response) {
            // hasError.value = false
            // validationError.value = ""
            
            console.log(response);
            
        })
        .catch(function (error) {
            validationError.value = error.response.data.errors
            hasError.value = true
            // console.log(error.response.data.errors);
            let obj = error.response.data.errors;

        })
        .finally(()=>{
            console.log("this is finally")

        })

        
        // console.log(createForm.value = "")

            
      
        }

        return {createForm,create,validationError,hasError}
    }
}
</script>

<style lang="scss" scoped>

</style>