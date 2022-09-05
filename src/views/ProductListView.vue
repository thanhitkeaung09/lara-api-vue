<template>
    <div class="w-[80%] mx-auto">
        
        <div class="overflow-x-auto relative">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="py-3 px-6">
                            #
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Name
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Price
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Stock
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Created at
                        </th>
                        <th scope="col" class="py-3 px-6">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody v-if="isDatas">
                    <tr v-for="(item,index) in datas.values.data" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{item.id}}
                        </td>
                        <td class="py-4 px-6">
                            {{item.name}}
                        </td>
                    <td class="py-4 px-6">
                            {{item.price}}
                        </td>
                        <td class="py-4 px-6">
                            {{item.stock}}
                        </td>  
                        <td class="py-4 px-6">
                            {{item.time}}
                        </td> 
                        <td class="py-4 px-6 space-x-5 position-relative" >
                            <a href="">
                                <i class="fa-solid fa-trash" @click.prevent="del(item.id)"></i>
                            </a>
                            <a href="">
                                <i  class="fa-solid fa-pencil" @click.prevent="edit(item.id)"></i>
                            </a>

                            <a href="">
                                <i class="fa-solid fa-info-circle" @click.prevent="show(item.id)"></i>
                            </a>

                            <div class=""  >
                            </div>

                        </td>  
                    </tr>
                </tbody>
            </table>

        </div>

        <div v-if="isDatas" class=" flex items-center justify-between " style="" >
            <Pagination :links="datas.values.meta.links" @url="fetchSingle"></Pagination>
            <div class="relative w-[40%] mt-5">
                <Search @search="searchkeyword" ></Search>
            </div>
        </div>

        

        <ShowInfoView v-if="isShow" @changeShowData="changeShowValue"  :datas="product" :allData="datas" class="" ></ShowInfoView>


    </div>

 

</template>



<script>
import { onMounted, ref, reactive } from '@vue/runtime-core'
import axios from 'axios'
import { useCounterStore } from '../stores/counter'
import Pagination from '@/components/Pagination.vue'
import ShowInfoView from '@/views/ShowInfoView.vue'
import { useRouter } from 'vue-router'
import Search from '@/components/Search.vue'
// import {throttle} from "lodash"
export default {
    setup () {
        let datas = reactive({});
        let product = reactive({});
        let isDatas = ref(false);
        let isShow = ref(false);
        let store = useCounterStore()
        let link = ref();
        let compareId = ref(false)

        let router = useRouter()

        let searchkeyword  = (keyword) =>{
            console.log(keyword)
            fetchSingle(store.apiUrl+"products?keyword="+keyword)
        }

        // let searchkeyword = throttle(function(keyword){
        //     console.log("hello")
        // },500)


          // let searchkeyword = debounce(function(keyword){
        //     console.log("hello")
        // },500)


        let edit = (id) =>{
            console.log(id)
            router.push({name:"edit",params: { id: id } })

        }

        let del = (id) =>{
            axios.delete(store.apiUrl+'products/'+id)
            .then(function (response) {
                console.log(response)
                fetchSingle(datas.values.meta.links.find(link => link.active === true).url)
                console.log(datas.values.meta.links.find(link => link.active === true).url)

            })
            .catch(function (error) {
                console.log(error)
            })
            .finally(()=>{
            })
            // console.log(datas.values.meta.links.find(link => link.active === true))

        }

        let changeShowValue = (value) =>{
            console.log(value.value)
            isShow.value = value.value
        }

        let show = (id) =>{

        axios.get(store.apiUrl+'products/'+id)
     
        .then(function (response) {
            console.log(response)
            product.value = response.data.data

        })
        .catch(function (error) {
            console.log(error)
        })
        .finally(()=>{
            isShow.value = true
        })

        
        }

        let fetchSingle = (url) =>{
                console.log(url)

                axios.get(url)
            // pagination fetch
            // axios.get('http://127.0.0.1:8000/api/v1/products?page=6')
        .then(function (response) {
            datas.values = response.data
            // response.data.meta.links[0].label = "Prev"
            // response.data.meta.links[((response.data.meta.links).length-1)].label = "Next"
            console.log();
            
            
        })
        .catch(function (error) {
            console.log(error)
        })
        .finally(()=>{
            console.log("this is finally")

        })
                
        }

        
        onMounted(()=>{
            axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem('token');

            store.hideLogReg()
            store.showUser()

            
            //  datas.values.meta.links[0].label = "Prev"
            // props.links[props.links.length-1].label = "Next"
            
            axios.get(store.apiUrl+'products')
            // pagination fetch
            // axios.get('http://127.0.0.1:8000/api/v1/products?page=6')
        .then(function (response) {
            datas.values = response.data
            isDatas.value = true

        //    response.data.meta.links[0].label = "Prev"
            console.log(response.data.meta.links[0].label);
            
        })
        .catch(function (error) {
            console.log(error)
        })
        .finally(()=>{
            console.log("this is finally")

        })
        })

        

        return {datas,isDatas,fetchSingle,link,del,show,product,isShow,compareId,changeShowValue,edit,searchkeyword}
    },
    components : {Pagination,ShowInfoView,Search}

}
</script>

<style lang="scss" scoped>

</style>