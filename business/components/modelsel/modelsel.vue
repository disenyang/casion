<template>
    <yii-modal class="templateconfig"
        v-model="modalShow"
        :auto-size="true"
        :height="panelHeight"
        :width="panelWidth"
		:maskClosable="false"
        :appendToBody="false">
        <template slot="title">模版配置信息</template>
        <div class="templateconfig-wrapper">
            <table class="casion-table">
                <tr>
                	<th style="width: 80px"><yii-checkbox v-model="queryChecked"></yii-checkbox><span class="q-til">查询列</span></th>
                    <th style="width: 80px"><yii-checkbox v-model="listChecked"></yii-checkbox><span class="q-til">列表列</span></th>
					<th style="width: 80px"><yii-checkbox v-model="settingChecked"></yii-checkbox><span class="q-til">编辑列</span></th>
					<th style="width: 80px"><yii-checkbox v-model="detailChecked"></yii-checkbox><span class="q-til">详情列</span></th>
                    <th>标题</th>
					<th style="width: 100px">名称</th>
                    <th style="width: 100px">类型</th>
                    <th style="width: 100px">是否必填</th>
					<th style="width: 150px">引用模型</th>
					<th style="width: 150px">引用模型显示列</th>
                </tr>
                <tr v-for="(row,index) in columnList">
                    <td><yii-checkbox v-model="row.queryChecked"></yii-checkbox></td>
                    <td><yii-checkbox v-model="row.listChecked"></yii-checkbox></td>
                    <td><yii-checkbox v-model="row.settingChecked"></yii-checkbox></td>
                    <td><yii-checkbox v-model="row.detailChecked"></yii-checkbox></td>
                    <td>{{row.title}}</td>
					<td>{{row.name}}</td>
                    <td>{{row.type | getItemTypeText}}</td>
                    <td>{{row.required | getItemRequiredText}}</td>
					<td>{{row.refmodel?row.refmodeltitle:""}}</td>
                    <td>{{row.refmodelshowitem?row.refmodelshowitemtitle:""}}</td>
                </tr>  
            </table>
        </div>
        <template slot="footer">
            <div class="btns">
                <button @click="confirm">确定</button>
                <button @click="close">关闭</button>
            </div>
        </template>
    </yii-modal>
</template>

<script>
    import modelsel from "./modelsel";
    export default modelsel;
</script>

<style src="./modelsel.css">
</style>