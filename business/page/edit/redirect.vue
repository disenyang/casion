<template>
    <div class="page-edit-wrapper">
    </div>    
</template>

<script>
    export default{
        data(){
            return {};
        },
        mounted(){
            let pageid = this.$route.params.pageid;
            this.$router.push({name:`${pageid}`,params:{id:pageid}});
        }
    }
</script>

