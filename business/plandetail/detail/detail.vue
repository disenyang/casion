<!-- Created by gaoyang 计划明细详情页面-->
<template>
    <div class="plandetail-detail-wrapper">
        <yii-row>
            <yii-col span="3"></yii-col>
            <yii-col span="5">
                {{plandetail.plan}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3"></yii-col>
            <yii-col span="5">
                {{plandetail.title}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3"></yii-col>
            <yii-col span="5">
                {{plandetail.content}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">完成度</yii-col>
            <yii-col span="5">
                {{plandetail.finished}}
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