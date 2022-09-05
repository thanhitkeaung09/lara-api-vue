<template>
    <div class="mt-5" >
       
        <nav aria-label="Page navigation example">
        <ul class="inline-flex -space-x-px">
            <li v-for="(item,index) in links" :key="index">
                <RouterLink @click="GotoLink(item.url)" to="" :class="{'active':item.active,'disabled':!item.url}" class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300   dark:bg-gray-800 dark:border-gray-700" v-html="item.label"></RouterLink>
            </li>
        </ul>
        </nav>

    </div>
</template>

<script>
import { onMounted, onUpdated } from '@vue/runtime-core'
    
export default {
    
    props : {
        links:{
            type:Array
        }
    },
    setup (props,context) {

      onMounted(()=>{
            props.links[0].label = "Prev"
            props.links[props.links.length-1].label = "Next"
      })

  

      onUpdated(()=>{
        changeLinks()
      })

      let changeLinks = () =>{
            props.links[0].label = "Prev"
            props.links[props.links.length-1].label = "Next"
      }

      let GotoLink = (url) =>{
            // console.log(url)
            context.emit("url",url)
      }

        return {GotoLink,changeLinks}
    }
}
</script>

<style lang="scss" scoped>

</style>