<!-- Created by gaoyang 导师详情页面-->
<template>
    <div class="tutor-detail-wrapper">
        <yii-row>
            <yii-col span="3">导师</yii-col>
            <yii-col span="5">
                {{tutor.tutor}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">学生</yii-col>
            <yii-col span="5">
                {{tutor.student}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">完成度</yii-col>
            <yii-col span="5">
                {{tutor.finishing}}
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