import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    counter: 0,
    myName : "Than Htike Aung",
    apiUrl : "http://127.0.0.1:8000/api/v1/",
    token : "",
    auth : "",
    showLoginRegister : true,
    showUserName : false,
    hide : false,
    returnLogin : ""
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    upperName : (state) => state.myName.toUpperCase()
  },
  actions: {
    addReturnLogintrue() {
      this.returnLogin = true;
    },
    addReturnLoginfalse(){
      this.returnLogin = false;
    },
    setToken(token){
      this.token = token
    },
    setAuth(auth){
      this.auth = auth
    },
    removeAuthToken(authRemove,tokenRemove){
      this.token = authRemove;
      this.auth = tokenRemove;
    },
    hideLogReg(){
      this.showLoginRegister = false
    },
    showLogReg(){
      this.showLoginRegister = true
    },
    showUser(){
      this.showUserName = true
    },
    hideUser(){
      this.showUserName = false
    }
  }
})
