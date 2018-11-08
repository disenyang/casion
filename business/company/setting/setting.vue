<!-- Created by gaoyang 公司新建/修改页面-->
<template>
    <div class="company-setting-wrapper">
        <yii-form class="form" ref="form" :model="formModel" :rules="formRules" label-span="4" content-span="18" label-position="right">
            <yii-form-item prop="name" label="名称" required>
                <yii-input v-model="formModel.name"  maxlength="36" counter ime placeholder="请输入名称"></yii-input>
            </yii-form-item>
            <yii-form-item prop="site" label="官网" required>
                <yii-input v-model="formModel.site"  maxlength="36" counter ime placeholder="请输入官网"></yii-input>
            </yii-form-item>
            <yii-form-item prop="site" label="logo" required>
                <div class="icon" @click="upload">
                    <div class="icon-img" v-if="formModel.logo">
                        <img :src="formModel.logo" >
                    </div>
                    <yii-button icon="plus" v-if="!formModel.logo" type="stroke"  size="large"></yii-button>
                </div>
                <yii-input v-model="formModel.logo" v-show="false"></yii-input>
                
            </yii-form-item>
            <yii-form-item prop="remark" label="描述" required>
                <yii-textarea v-model="formModel.remark"  maxlength="200" counter ime placeholder="请输入描述"></yii-textarea>
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