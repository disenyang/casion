<!-- Created by gaoyang 计划明细新建/修改页面-->
<template>
    <div class="plandetail-setting-wrapper">
        <yii-form class="form" ref="form" :model="formModel" :rules="formRules" label-span="4" content-span="18" label-position="right">
            
            <yii-form-item prop="title" label="标题" required>
                <yii-input v-model="formModel.title"  maxlength="36" counter ime placeholder="请输入"></yii-input>
            </yii-form-item>
            <yii-form-item prop="content" label="内容" required>
                <yii-textarea v-model="formModel.content"  maxlength="200" counter ime placeholder="请输入"></yii-textarea>
            </yii-form-item>
            
            <yii-form-item>
                <yii-button type="stroke" @click="back()">返回</yii-button>
                <yii-button @click="save()">保存</yii-button>
            </yii-form-item>
        </yii-form>
    </div>
</template>

<script>
    import setting from "./setting";
    export default setting;
</script>

<style src="./setting.css"></style>