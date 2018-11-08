<!-- Created by gaoyang 计划列表页面-->
<template>
    <div class="personal-wrapper">
        <div class="personal-wrapper-left">
            <div class="headimg">
                <div class="headimg-content" @mouseenter="showUpload=true" @mouseleave="showUpload=false">
                    <img :src="userinfo.headimg || defaultHeadimg">
                    <div class="show-upload" @click="upload" v-if="showUpload">
                        上传图片
                    </div>
                </div>
            </div>
            <div class="nickname">
                <input v-model="userinfo.nickname" @blur="updateNickname">
            </div>
            <div class="details">
                <div class="name">
                    姓名：<input v-model="userinfo.name" @blur="updateName">
                </div>
                <div class="sex">
                    性别：未知
                </div>
                <div class="createtime">
                    加入时间：{{userinfo.createtime}}
                </div>
            </div>
            <div class="teams">
                <div class="name">
                    所属公司：{{userinfo.companyname}}
                </div>
                <div class="createtime">
                    所属团队：{{userinfo.teamname}}
                </div>
            </div>
        </div>
        <div class="personal-wrapper-right">
            <div class="tabbar">
                <div class="tab" :class="{selected:tabSelectIndex==1}" @click="tabSelectIndex=1">
                    首页
                </div>
                <div class="tab" :class="{selected:tabSelectIndex==2}" @click="tabSelectIndex=2">
                    项目
                </div>
                <div class="tab" :class="{selected:tabSelectIndex==3}" @click="tabSelectIndex=3">
                    关注
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import personal from "./personal";
    export default personal;
</script>

<style src="./personal.css"></style>