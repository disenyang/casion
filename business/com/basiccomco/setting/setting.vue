<!-- Created by gaoyang 基础组件库新建/修改页面-->
<template>
    <div class="basiccomco-setting-wrapper">
        <yii-form class="form" ref="form" :model="formModel" :rules="formRules" label-span="6" content-span="18" label-position="right">
            <yii-form-item prop="name" label="组件库名称" required>
                <yii-input v-model="formModel.name"  maxlength="36" counter ime placeholder="请输入组件库名称"></yii-input>
            </yii-form-item>
            <yii-form-item prop="remark" label="描述" required>
                <yii-input v-model="formModel.remark"  maxlength="36" counter ime placeholder="请输入描述"></yii-input>
            </yii-form-item>
            <yii-form-item prop="count" label="组件数量" required>
                <yii-input v-model="formModel.count"  maxlength="36" counter ime placeholder="请输入组件数量"></yii-input>
            </yii-form-item>
            <yii-form-item prop="images" label="图片" required>
                <div class="icon" @click="upload">
                    <div class="icon-img" v-if="formModel.images">
                        <img :src="formModel.images" >
                    </div>
                    <yii-button icon="plus" v-if="!formModel.images" type="stroke"  size="large"></yii-button>
                </div>
                <yii-input v-model="formModel.images" v-show="false" placeholder="请输入图片"></yii-input>
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