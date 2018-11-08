<!-- Created by gaoyang 数据模型新建/修改页面-->
<template>
    <div class="model-setting-wrapper">
        <yii-form class="form" ref="form" :model="formModel" :rules="formRules" label-span="5" content-span="15" label-position="right">
            <yii-form-item prop="title" label="标题" required>
                <yii-input v-model="formModel.title"  maxlength="36" counter ime placeholder="请输入名称"></yii-input>
            </yii-form-item>
            <yii-form-item prop="name" label="名称(英文)" required>
                <yii-input v-model="formModel.name"  maxlength="36" counter ime placeholder="请输入显示名称"></yii-input>
            </yii-form-item>
            <yii-form-item prop="remark" label="描述" required>
                <yii-input v-model="formModel.remark"  maxlength="36" counter ime placeholder="请输入描述"></yii-input>
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