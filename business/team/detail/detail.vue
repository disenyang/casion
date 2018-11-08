<!-- Created by gaoyang 团队详情页面-->
<template>
    <div class="team-detail-wrapper">
        <yii-row>
            <yii-col span="3">名称</yii-col>
            <yii-col span="20">
                {{team.name}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">描述</yii-col>
            <yii-col span="20">
                {{team.remark}}
            </yii-col>
        </yii-row>
        <!-- <yii-row>
            <yii-col span="3">公司</yii-col>
            <yii-col span="5">
                {{team.company}}
            </yii-col>
        </yii-row> -->
        <yii-row>
            <yii-col span="3">用户</yii-col>
            <yii-col span="7">
               <div class="select-users">
                    <div class="user" v-for="(user,index) in team.users">
                        <img :src="user.headimg||defaultHeadimg"><span>{{user.name || user.nickname}}</span>
                    </div>
                </div>
            </yii-col>
        </yii-row>
        <yii-row>
        </yii-row>
        
    </div>
</template>

<script>
    import detail from "./detail";
    export default detail;
</script>

<style src="./detail.css"></style>