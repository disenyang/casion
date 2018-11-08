<!-- Created by gaoyang 积分明细详情页面-->
<template>
    <div class="scoredetail-detail-wrapper">
        <yii-row>
            <yii-col span="3">用户</yii-col>
            <yii-col span="5">
                {{scoredetail.user}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">类型</yii-col>
            <yii-col span="5">
                {{scoredetail.type}}
            </yii-col>
        </yii-row>
        <yii-row>
            <yii-col span="3">获得积分</yii-col>
            <yii-col span="5">
                {{scoredetail.score}}
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