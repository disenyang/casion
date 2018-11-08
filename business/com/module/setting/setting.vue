<!-- Created by gaoyang 模版新建/修改页面-->
<template>
    <div class="template-setting-wrapper">
        <yii-form class="form" ref="form" :model="formModel" :rules="formRules" label-span="4" content-span="15" label-position="right">
            <yii-form-item prop="name" label="名称" required>
                <yii-input v-model="formModel.name"  maxlength="36" counter ime placeholder="请输入名称"></yii-input>
            </yii-form-item>
            
            <yii-form-item prop="image" label="图片" required>
                <div class="image" @click="upload">
                    <div class="image-img" v-if="formModel.image">
                        <img :src="formModel.image" >
                    </div>
                    <yii-input v-model="formModel.image" v-show="false"></yii-input>
                    <yii-button icon="plus" v-if="!formModel.image" type="stroke"  size="large"></yii-button>
                </div>
            </yii-form-item>
            <yii-form-item prop="remark" label="说明">
                <yii-textarea v-model="formModel.remark"  maxlength="36" counter ime placeholder="请输入说明"></yii-textarea>
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