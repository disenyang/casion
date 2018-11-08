<!-- Created by gaoyang 数据模型列表页面-->
<template>
    <div class="model-list-wrapper">
        <div class="model-left">
            <div class="title">
                <div class="caption">数据库列表</div>
                <yii-button size="small" type="text" class="new-db" @click="gotoNewDb()">+新建</yii-button>
            </div>
            <div class="list">
                <div class="db-wrapper" :class="{selected:db==selectedDb}" v-for="db in dbList" @click="clickDb(db)">
                    <div class="name">{{db.name}}</div>
                    <yii-button v-if="db==selectedDb" type="text" color="#ffffff" icon="edit" @click="editDb(db)"></yii-button>
                </div>
            </div>
        </div>
        <div class="model-center">
            <div class="title" >
                <div class="caption">数据模型列表</div>
                 <yii-button size="small" class="import-model" icon="addfile" type="text" @click="importIn()">导入</yii-button>
                <yii-button size="small"  class="new-model" icon="plus" type="text" @click="gotoNew()">新建</yii-button>
            </div>
            <div class="list" v-if="selectedDb">
                <div class="model-wrapper" :class="{selected:model==selectedModel}" v-for="model in modelList" @click="clickModel(model)">
                    <div class="name">{{model.title}}/{{model.name}}</div>
                    <yii-button v-if="model==selectedModel" type="text" color="#ffffff" icon="edit" @click="editModel(model)"></yii-button>
                </div>
            </div>
        </div>
        <div class="model-right">
            <div class="title" >
                数据项
            </div>
            <div class="options" >
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
            <div class="btns">
                <yii-button type="solid" size="small" @click="createOptionItems()">创建操作项</yii-button>
                <yii-button type="solid" size="small" @click="createSql()">mysql脚本</yii-button>
                <yii-button type="solid" size="small" :disabled="!selectedModel" @click="createFe()">生成前端代码</yii-button>
                <yii-button type="solid" size="small" :disabled="!selectedModel" @click="createBackend()">生成后端代码</yii-button>
                <yii-button type="solid" size="small" :disabled="!selectedModel" @click="createIos()">生成ios代码</yii-button>
                <yii-button type="solid" size="small" :disabled="!selectedModel" @click="createAndroid()">生成安卓代码</yii-button>
            </div>
            <div class="list" >
                <table class="my-table">
                    <tr>
                        <th style="width: 20%">字段名称</th>
                        <th style="width: 20%">显示名称</th>
                        <th style="width: 10%">类型</th>
                        <th style="width: 10%">是否必填</th>
                        <th style="width: 20%">引用模型</th>
                        <th style="width: 20%">引用模型显示项</th>
                    </tr>
                    <tr v-for="item in modelitems" :class="{'row-selected':item.selected}"  @click="clickModelitem(item)">
                        <td>
                            <input type="text" v-model="item.name">
                        </td>
                        <td>
                            <input type="text" v-model="item.title">
                        </td>
                        <td>
                            <select v-model="item.type">
                                <option v-for="option in modelitemTypes" :value="option.value">{{option.caption}}</option>
                            </select>
                        </td>
                        <td>
                            <select v-model="item.required">
                                <option value="1">必填</option>
                                <option value="2">非必填</option>
                            </select>
                        </td> 
                        <td>
                            <select v-model="item.refmodel" @change="changeRefmodel(item)">
                                <option value=""></option>
                                <option v-for="model in modelList" :value="model.id">{{model.title}}</option>
                            </select>
                        </td>
                        <td>
                            <select v-model="item.refmodelshowitem">
                                <option value=""></option>
                                <option v-for="option in item.refmodelitems" :value="option.id">{{option.title}}</option>
                            </select>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="setting" v-if="selectedModel && selectModelitem">
                <yii-row>
                    <yii-col class="p-label">最小值</yii-col>
                    <yii-col span="7" class="p-value">
                        <yii-input  v-model="selectModelitem.minvalue"></yii-input>
                    </yii-col>
               
                    <yii-col class="p-label">最大值</yii-col>
                    <yii-col span="7" class="p-value">
                        <yii-input v-model="selectModelitem.maxvalue"></yii-input>
                    </yii-col>
                </yii-row>
                <yii-row>
                    <yii-col class="p-label">最小长度</yii-col>
                    <yii-col span="7" class="p-value">
                        <yii-input v-model="selectModelitem.minlength"></yii-input>
                    </yii-col>
               
                    <yii-col class="p-label">最大长度</yii-col>
                    <yii-col span="7" class="p-value">
                        <yii-input v-model="selectModelitem.maxlength"></yii-input>
                    </yii-col>
                </yii-row>
                <yii-row v-if="selectModelitem.type=='file' ||  selectModelitem.type=='image'">
                    <yii-col class="p-label" v-if="selectModelitem.type=='file'">文件数量</yii-col>
                    <yii-col class="p-label" v-if="selectModelitem.type=='image'">图片数量</yii-col>

                    <yii-col span="7" class="p-value">
                        <yii-input  v-model="selectModelitem.fileminnum" placeholder="最小数量"></yii-input>
                    </yii-col>
                    <yii-col class="p-label">-----------------</yii-col>
                    <yii-col span="7" class="p-value">
                        <yii-input v-model="selectModelitem.filemaxnum" placeholder="最大数量"></yii-input>
                    </yii-col>
                </yii-row>
                <yii-row v-if="selectModelitem.type=='file' || selectModelitem.type=='image'">
                    <yii-col class="p-label">图片尺寸</yii-col>
                    <yii-col span="7" class="p-value">
                        <yii-input  v-model="selectModelitem.imagesize" placeholder="图片尺寸"></yii-input>
                    </yii-col>
                    <yii-col class="p-label" v-if="selectModelitem.type=='file'">文件字节大小</yii-col>
                    <yii-col class="p-label" v-if="selectModelitem.type=='image'">图片字节大小</yii-col>
                    <yii-col span="7" class="p-value">
                        <yii-input v-model="selectModelitem.imagemaxbite" placeholder="文件字节大小"></yii-input>
                    </yii-col>
                </yii-row>
                <yii-row v-if="selectModelitem.type=='file' || selectModelitem.type=='image'">
                    <yii-col class="p-label" v-if="selectModelitem.type=='file'">文件类型</yii-col>
                    <yii-col class="p-label" v-if="selectModelitem.type=='image'">图片类型</yii-col>
                    <yii-col span="14" class="p-value">
                        <yii-input width="100%"  v-model="selectModelitem.filetype"></yii-input>
                    </yii-col>
                </yii-row>
                <yii-row>
                    <yii-col class="p-label">值列表</yii-col>
                    <yii-col class="p-value" span="2">
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
</template>

<script>
    import list from "./list";
    export default list;
</script>

<style src="./list.css"></style>