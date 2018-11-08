<!-- Created by gaoyang 工作记录详情页面-->
<template>
    <div class="workrecord-detail-wrapper">
        <yii-row>
            <yii-col span="3">内容</yii-col>
            <yii-col span="5">
                {{workrecord.content}}
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