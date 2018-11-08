<!-- Created by gaoyang 页面文件夹详情页面-->
<template>
    <div class="pagefolder-detail-wrapper">
        <yii-row>
            <yii-col span="3">名称</yii-col>
            <yii-col span="5">
                {{pagefolder.name}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">显示名称</yii-col>
            <yii-col span="5">
                {{pagefolder.showname}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">父文件夹</yii-col>
            <yii-col span="5">
                {{pagefolder.parentid}}
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