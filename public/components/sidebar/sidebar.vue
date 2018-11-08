<template>

    <div class="sidebar" >
        <div class="level1-wrapper" v-bind:class="{selected:menu.selected}" @click="clickMenu(menu)" v-for="menu in menus">
            {{menu.name}}
        </div>
    </div>
    
</template>

<script>

    const DEFAULT_EL_PADDING_RIGHT = 10;

    import Utils from 'utils';
    
    export default {

        name: 'sidebar',

        props: {
            menus:{
                type: Array,
                default() {
                    return [];
                }
            }
        },

        data(){
            return {
               
            };
        },

        computed: {

        },
 
        watch: {

            value: {
                immediate: false,
                handler(newVal){
                    this.$emit('change', newVal);
                    this.dispatch('YiiFormItem', 'yii.form.change', newVal);
                }
            }
        },

        mounted(){

        },
        methods: {
            clickMenu(menu){
                this.menus.forEach((menu,i)=>{
                    menu.selected=false;
                })
                menu.selected = true;
                console.log("url",menu.url);
                this.$router.push(menu.url);
            }
        }
    }

</script>


<style>
.sidebar{
    background-color: #f2f2f2;
    line-height: 60px;
    color: #4c607c;
    .level1-wrapper{
        padding-left: 20px;
        cursor: pointer;
        &.selected{
            color: #354662;
            background-color: #dfe1e5;
        }
    }
}
</style>