<!-- Created by gaoyang 导师任务详情页面-->
<template>
    <div class="tutortask-detail-wrapper">
        <yii-row>
            <yii-col span="3">标题</yii-col>
            <yii-col span="5">
                {{tutortask.title}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">内容</yii-col>
            <yii-col span="5">
                {{tutortask.content}}
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