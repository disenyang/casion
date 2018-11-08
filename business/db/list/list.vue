<!-- Created by gaoyang 数据库列表页面-->
<template>
    <div class="db-list-wrapper">
        <div class="db-list-left">
            <div>
                <yii-row>
                    <yii-button @click="gotoNew()">新建数据库</yii-button>
                </yii-row>
            </div>
            
            <div class="db-list">
                <div class="db" v-for="(row,index) in dataList">
                    <div>{{row.name}}</div>
                </div>  
            </div>
        </div>
        <div class="db-list-right">
            <div class="model-list-wrapper">
                <div class="model-left">
                    <div class="title">
                        数据库列表
                    </div>
                    <div class="list">
                        <div class="db-wrapper" :class="{selected:db==selectedDb}" v-for="db in dbList" @click="clickDb(db)">
                            {{db.name}}
                        </div>
                    </div>
                </div>
                <div class="model-center">
                    <div class="title" v-if="selectedDb">
                        <div class="caption">数据模型列表</div>
                        <div class="new-model" @click="gotoNew()">+新建</div>
                    </div>
                    <div class="list" v-if="selectedDb">
                        <div class="model-wrapper" :class="{selected:model==selectedModel}" v-for="model in dataList" @click="clickModel(model)">
                            {{model.name}}/{{model.showname}} 
                        </div>
                    </div>
                </div>
                <div class="model-right">
                    <div class="title" v-if="selectedModel">
                        数据项
                    </div>
                    <div class="options" v-if="selectedModel">
                        <yii-tooltip content="新增" placement="top" effect="blue">
                             <div class="icon-btn new-btn" @click="addModelitem()"></div>
                        </yii-tooltip>
                        <yii-tooltip content="删除" placement="top" effect="blue">
                            <div class="icon-btn del-btn"></div>
                        </yii-tooltip>
                        <yii-tooltip content="保存" placement="top" effect="blue">
                            <div class="icon-btn save-btn" @click="saveModelitems()"></div>
                        </yii-tooltip>
                        <yii-tooltip content="上移" placement="top" effect="blue">
                            <div class="icon-btn moveup-btn" @click="moveModelitems(1)"></div>
                        </yii-tooltip>
                        <yii-tooltip content="下移" placement="top" effect="blue">
                            <div class="icon-btn movedown-btn" @click="moveModelitems(2)"></div>
                        </yii-tooltip>
                    </div>
                    <div class="list" v-if="selectedModel">
                        <table class="my-table">
                            <tr>
                                <th style="width: 30%">字段名称</th>
                                <th style="width: 30%">显示名称</th>
                                <th style="width: 20%">类型</th>
                                <th style="width: 20%">是否必填</th>
                            </tr>
                            <tr v-for="item in modelitems" :class="{'row-selected':item.editable}" @click="clickModelitem(item)">
                                <td>
                                    <span v-if="!item.editable">{{item.name}}</span>
                                    <input v-if="item.editable" type="text" v-model="item.name">
                                </td>
                                <td>
                                    <span v-if="!item.editable">{{item.showname}}</span>

                                    <input v-if="item.editable" type="text" v-model="item.showname">
                                </td>
                                <td>
                                    <span v-if="!item.editable">{{item.type | getItemTypeText}}</span>
                                    <select v-if="item.editable" v-model="item.type">
                                        <option v-for="option in modelitemTypes" :value="option.value">{{option.caption}}</option>
                                    </select>
                                </td>
                                <td>
                                    <span v-if="!item.editable">{{item.required | getItemRequiredText}}</span>
                                    <select v-if="item.editable" v-model="item.required">
                                        <option value="1">必填</option>
                                        <option value="2">非必填</option>
                                    </select>
                                </td> 
                            </tr>
                        </table>
                    </div>
                    <div class="setting" v-if="selectedModel && selectModelitem">
                        <yii-row>
                            <yii-col class="p-label">最小值</yii-col>
                            <yii-col span="5" class="p-value">
                                <yii-input  v-model="selectModelitem.minvalue"></yii-input>
                            </yii-col>
                       
                            <yii-col class="p-label">最大值</yii-col>
                            <yii-col span="5" class="p-value">
                                <yii-input v-model="selectModelitem.maxvalue"></yii-input>
                            </yii-col>
                        </yii-row>
                        <yii-row>
                            <yii-col class="p-label">最小长度</yii-col>
                            <yii-col span="5" class="p-value">
                                <yii-input v-model="selectModelitem.minlength"></yii-input>
                            </yii-col>
                       
                            <yii-col class="p-label">最大长度</yii-col>
                            <yii-col span="5" class="p-value">
                                <yii-input v-model="selectModelitem.maxlength"></yii-input>
                            </yii-col>
                        </yii-row>
                        <yii-row>
                            <yii-col class="p-label">值列表</yii-col>
                            <yii-col class="p-value" span="1">
                                <table class="my-value-table">
                                    <tr>
                                        <th>
                                            标题
                                        </th>
                                        <th>
                                            值
                                        </th>
                                    </tr>
                                    <tr v-for="(value,index) in selectModelitem.valuelist">
                                        <td>
                                            <yii-input v-model="value.val" maxlength="36" counter ime></yii-input>
                                        </td>
                                        <td>    
                                            <yii-input v-model="value.title" maxlength="36" counter ime></yii-input>
                                        </td>
                                    </tr>
                                </table>
                                <div class="btn-new" @click="addModelitemValue()"></div>
                            </yii-col>
                           
                        </yii-row>
                        <yii-row>
                            <yii-col class="p-label">值列表类型</yii-col>

                            <yii-col span="5" class="p-value">
                                <yii-select v-model="selectModelitem.valueschecktype">
                                    <yii-select-option value="1" label="单选"></yii-select-option>
                                    <yii-select-option value="2" label="多选"></yii-select-option>
                                </yii-select>
                            </yii-col>
                        </yii-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import list from "./list";
    export default list;
</script>

<style src="./list.css">
</style>