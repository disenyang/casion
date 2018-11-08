<!-- Created by gaoyang 用户项目配置详情页面-->
<template>
    <div class="userprojectconfig-detail-wrapper">
        <yii-row>
            <yii-col span="3">用户</yii-col>
            <yii-col span="5">
                {{userprojectconfig.user}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">项目</yii-col>
            <yii-col span="5">
                {{userprojectconfig.project}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">打开的页面</yii-col>
            <yii-col span="5">
                {{userprojectconfig.openpageid}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">根结点是否打开</yii-col>
            <yii-col span="5">
                {{userprojectconfig.rootopen}}
            </yii-col>
        </yii-row>
        <yii-row>
        </yii-row>
        <yii-row>
            <yii-button type="stroke" @click="back()">返回</yii-button>
        </yii-row>
    </div>
</template>

<script>
    import detail from "./detail";
    export default detail;
</script>

<style src="./detail.css"></style>