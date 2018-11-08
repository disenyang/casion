<template>
    
<yii-modal class="dbtablesel"
        v-model="modalShow"
        :auto-size="true"
        :height="panelHeight"
        :width="panelWidth"
        :maskClosable="false"
        :appendToBody="false">
        <template slot="title">从数据库导入模型</template>
        <div class="dbtablesel-wrapper">
            <yii-row>
                <yii-col span="5" class="col">
                    <yii-input v-model="table" placeholder="请输入表名称" >
                    </yii-input>
                </yii-col>
                <yii-col span="5" class="col">
                    <yii-input v-model="modelTitle" placeholder="请设置模型标题" >
                    </yii-input>
                </yii-col>
                <yii-col span="5" class="col">
                    <yii-button @click="getDbTables" >查询</yii-button>
                </yii-col>
            </yii-row>
            <table class="casion-table">
                <tr>
                    <th>标题</th>
                    <th style="width: 100px">名称</th>
                    <th style="width: 100px">类型</th>
                    <th style="width: 100px">是否必填</th>
                </tr>
                <tr v-for="(row,index) in items">
                    <td>{{row.title}}</td>
                    <td>{{row.name}}</td>
                    <td>{{row.type}}</td>
                    <td>{{row.required?"是":"否"}}</td>
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
    import dbtablesel from "./dbtablesel";
    export default dbtablesel;
</script>

<style src="./dbtablesel.css">
</style>
