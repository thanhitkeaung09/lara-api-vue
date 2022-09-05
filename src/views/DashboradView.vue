<template>
    <div class="w-[80%] mx-auto">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis explicabo delectus reiciendis ipsam adipisci ratione, doloribus magnam optio officia beatae, quod architecto, quae exercitationem consequuntur natus ab voluptates blanditiis ea.</p>
        <div class="mt-5">
            <button @click="create" type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">Product Create</button>
            <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" @click="productList">Product List</button>

        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useCounterStore } from '../stores/counter'

export default {
    setup () {

        
        let store = useCounterStore()
        var headers = new Headers();
        headers.append("Authorization", "Bearer "+store.token);

        let router = useRouter()

        if(!store.token){
            router.push({name:'login'})
        }
        store.hideLogReg()
        store.showUser()


        let productList = () =>{
            router.push({name:'productList'})
        }
        
        let logout = () =>{

            fetch(store.apiUrl+"logout",{
                method : "POST",
                headers
            })
            .then(res => res.json())
            .then(json => {
                console.log(json)
                store.removeAuthToken("","")
                
                
                router.push({name:'login'})
                
            })
            console.log("this is logout")
        }


        let create = () =>{
            router.push({name:"create"})
            console.log("hello create")
            store.hideLogReg()

        }


        return {logout,create,productList}
    }
}
</script>

<style lang="scss" scoped>

</style>