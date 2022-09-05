<template>
    <div class="w-[30%] mx-auto">
        <div class="grid grid-cols-4">
            <div class="col-span-4">
            <h1 class="text-[25px] mb-5" >Login Form</h1>
                <div class="">
                    <form @submit.prevent="login" ref="loginForm">
          
            <div class="mb-6">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Email</label>
                <input type="email" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input Your Email" name="email" required="">
            </div>

            <div class="mb-6">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Password</label>
                <input type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input Your Password" name="password" required="">
            </div>

            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>

            </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from '../stores/counter';

export default {
    setup () {
        const loginForm = ref("")
        let store = useCounterStore();
        let router = useRouter()
        
        store.showLogReg()
        store.hideUser()

        store.addReturnLoginfalse()
        
        if(store.token){
            router.push({name:"dashboard"})
        }

       
        let login = () =>{
            console.log(loginForm.value)
            let formData = new FormData(loginForm.value);

        


            fetch(store.apiUrl+'login',{
                method : "POST",
                body : formData
            })
            .then(res => res.json())
            .then(json => {
                    if(json.success === true){  
                        localStorage.setItem("auth",JSON.stringify(json.auth))
                        localStorage.setItem("token",json.token)
                        store.setToken(json.token);
                        store.setAuth(json.auth);
                        store.addReturnLogintrue();
                        store.hideLogReg()
                        router.push({name:'dashboard'})
                    }
             
                console.log(json.auth)
            })
            // console.log(formData.get("name"),formData.get("password"),formData.get("confirm"))
        }

        return {login,loginForm}
    }
}
</script>

<style lang="scss" scoped>

</style>