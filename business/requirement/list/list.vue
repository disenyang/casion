<!-- Created by gaoyang 需求列表页面-->
<template>
    <div class="requirement-list-wrapper">
        <div class="p-search-req">
            <yii-row>
                <yii-col span="5" class="p-search-content">
                    <input class="input-search" v-model="params.name" placeholder="名称">
                </yii-col>
                <yii-col span="2" class="p-search-label">开发者</yii-col>
                <yii-col span="4" class="p-search-content">
                    <yii-select v-model="params.developer"  v-if="users && users.length!=0"  width="50px;">
                        <yii-select-option v-for="(user,index) in users" :key="index" :label="user.name" :value="user.id"></yii-select-option>    
                    </yii-select>
                </yii-col>
                <yii-col  span="2" class="p-search-label">开发状态</yii-col>
                <yii-col span="4" class="p-search-content">
                    <yii-select v-model="params.status">
                        <yii-select-option value="" label="全部"></yii-select-option>
                        <yii-select-option value="0" label="新建"></yii-select-option>
                        <yii-select-option value="1" label="开发中"></yii-select-option>
                        <yii-select-option value="2" label="尚未联调"></yii-select-option>
                        <yii-select-option value="3" label="联调中"></yii-select-option>
                        <yii-select-option value="4" label="尚未提测"></yii-select-option>
                        <yii-select-option value="5" label="测试中"></yii-select-option>
                        <yii-select-option value="6" label="尚未上线"></yii-select-option>
                        <yii-select-option value="7" label="已上线"></yii-select-option>
                    </yii-select>
                </yii-col>
                <yii-col  span="2" class="p-search-btn">
                    <yii-button size="middle" @click="search">查询</yii-button>
                </yii-col>
            </yii-row>

        </div>
        <div class="p-req-con">
            <div class="p-desc-content">
                <div class="p-descs">
                    <div class="p-desc">
                        <div class="p-desc-title">
                            开发
                        </div>
                        <div class="p-desc-value p-desc-value-dev">
                            
                        </div>
                    </div>
                    <div class="p-desc">
                        <div class="p-desc-title">
                            联调
                        </div>
                        <div class="p-desc-value p-desc-value-couplet">
                            
                        </div>
                    </div>
                    <div class="p-desc">
                        <div class="p-desc-title">
                            提测
                        </div>
                        <div class="p-desc-value p-desc-value-test">
                            
                        </div>
                    </div>
                    <div class="p-desc">
                        <div class="p-desc-title">
                            上线
                        </div>
                        <div class="p-desc-value p-desc-value-online">
                            
                        </div>
                    </div>
                </div>
                <table class="requirement-table">
                    <tr>
                        <th style="width: 30px"><i class="add-btn" type="text" @click="addRow()"></i></th>
                        <th style="width: 150px">需求名称</th>
                        <th style="width: 100px">开发者</th>
                        <th style="width: 100px">状态</th>
                        <th style="width: 100px">bug量</th>
                        <th style="width: 100px">操作</th>
                        <th></th>
                    </tr>
                    <tr v-for="(row,index) in dataList">

                        <td>{{index+1}} <i class="del-btn" v-if="row.createuser===userinfo.id" type="text" @click="del($event, row.id)"></i><i class="edit-btn" v-if="row.createuser==userinfo.id" type="text" @click="edit(row)"></i></td>
                        <td>{{row.name}}</td>
                        <td>
                            {{row.developername}}
                        </td>
                        <td>
                            <div class="status-bar" :class="{'status-dev':row.status==1,'status-couplet':row.status==3,'status-test':row.status==5,'status-online':row.status==7}">
                                <span v-if="row.status==0">新建</span>
                                <span v-if="row.status==1">开发中</span>
                                <span v-if="row.status==2">尚未联调</span>
                                <span v-if="row.status==3">联调中</span>
                                <span v-if="row.status==4">尚未提测</span>
                                <span v-if="row.status==5">测试中</span>
                                <span v-if="row.status==6">尚未上线</span>
                                <span v-if="row.status==7">已上线</span>
                            </div>
                        </td>
                        <td class="bug-td">
                            <!-- <div>最大需求:{{row.maxreqbugnum}}</div> -->
                            <div>最大代码:{{row.maxcodebugnum}}</div>
                            <!-- <div>实际需求:0</div> -->
                            <div>实际代码:{{row.codebugnum}}</div>
                        </td>
                        <td>
                            <div v-if="row.createuser===userinfo.id || row.developer===userinfo.id">
                                <yii-button type="text" v-if="row.status==0" @click="updateStatus(row,1)">开始开发</yii-button>
                                <yii-button type="text" v-if="row.status==1" @click="updateStatus(row,2)">完成开发</yii-button>
                                <yii-button type="text" v-if="row.status==2" @click="updateStatus(row,3)">开始联调</yii-button>
                                <yii-button type="text" v-if="row.status==3" @click="updateStatus(row,4)">完成联调</yii-button>
                                <yii-button type="text" v-if="row.status==4" @click="updateStatus(row,5)">开始提测</yii-button>
                                <yii-button type="text" v-if="row.status==5" @click="updateStatus(row,6)">完成提测</yii-button>
                                <yii-button type="text" v-if="row.status==6" @click="updateStatus(row,7)">上线</yii-button>
                            </div>
                        </td>
                        <td>
                            <div class="time-bar">
                                <div class="time-axis">
                                    <yii-tooltip :content="'开发开始时间:'+row.dev_start_date">
                                    <div class="time-dot dev-start-date" :style="{left:row.dev_start_date_left}">
                                        <div class="time-value">{{row.dev_start_date}}</div>
                                    </div>
                                    </yii-tooltip>
                                    <yii-tooltip :content="'开发结束时间:'+row.dev_end_date">
                                        <div class="time-dot dev-end-date" :style="{left:row.dev_end_date_left}">
                                            <div class="time-value">{{row.dev_end_date}}</div>
                                        </div>
                                    </yii-tooltip>
                                    <yii-tooltip :content="'联调开始时间:'+row.couplet_start_date">
                                        <div class="time-dot couplet-start-date" :style="{left:row.couplet_start_date_left}">
                                            <div class="time-value">{{row.couplet_start_date}}</div>
                                        </div>
                                    </yii-tooltip>
                                    <yii-tooltip :content="'联调结束时间:'+row.couplet_end_date">
                                        <div class="time-dot couplet-end-date" :style="{left:row.couplet_end_date_left}">
                                            <div class="time-value">{{row.couplet_end_date}}</div>
                                        </div>
                                    </yii-tooltip>
                                    <yii-tooltip :content="'提测开始时间:'+row.test_start_date">
                                        <div class="time-dot test-start-date" :style="{left:row.test_start_date_left}">
                                            <div class="time-value">{{row.test_start_date}}</div>
                                        </div>
                                    </yii-tooltip>
                                    <yii-tooltip :content="'提测结束时间:'+row.test_end_date">
                                        <div class="time-dot test-end-date" :style="{left:row.test_end_date_left}">
                                            <div class="time-value">{{row.test_end_date}}</div>
                                        </div>
                                    </yii-tooltip>
                                    <yii-tooltip :content="'上线时间:'+row.online_date">
                                        <div class="time-dot online-date" :style="{left:row.online_date_left}">
                                            <div class="time-value">{{row.online_date}}</div>
                                        </div>
                                    </yii-tooltip>
                                    <div class="today-progress" :style="{width:row.today_left}">

                                    </div>
                                </div>
                                
                            </div>
                        </td>
                    </tr>
                </table>
                <yii-pagination 
                class="p-pagination"
                :total-items="pages.total" 
                :items-per-page="pages.pageSize" 
                align="right"
                v-model="pages.currentPage"
                @current-change="list"
                @page-size-change="pageSizeChange"></yii-pagination>
            </div>
            <!-- <div class="p-c-content">
                <div class="top-bar">
                </div>
                <div class="requirement-timer">
                    <table class="requirement-timer-table">
                        <tr>
                            <th v-for="(row,index) in dayList">
                                <div class="day-wrapper">
                                    <div class="day">{{row.day}}</div>
                                    <div class="week">{{row.week}}</div>
                                    <div v-if="row.isToday" class="today-log">
                                        <div class="today">
                                            今天
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="today-alert" v-if="row.isToday">
                                    
                                </div>
                            </th>
                        </tr>
                        <tr v-for="(row,index) in dataList">
                            <td v-for="(day,index) in row.days" 
                            @click="day.editable = true" 
                            :class="{'day-mode-dev':day.dev,'day-mode-couplet':day.couplet,'day-mode-test':day.test,'day-mode-online':day.online}">
                                <yii-select @change="changeModeDate(day,row)" v-if="day.editable || day.mode" v-model="day.mode" width="50px;">
                                    <yii-select-option label="开发开始" value="dev_start_date"></yii-select-option>
                                    <yii-select-option label="开发结束" value="dev_end_date"></yii-select-option>
                                    <yii-select-option label="联调开始" value="couplet_start_date"></yii-select-option>
                                    <yii-select-option label="联调结束" value="couplet_end_date"></yii-select-option>
                                    <yii-select-option label="提测开始" value="test_start_date"></yii-select-option>
                                    <yii-select-option label="提测结束" value="test_end_date"></yii-select-option>
                                    <yii-select-option label="上线时间" value="online_date"></yii-select-option>
                                </yii-select>
                                <div class="today-alert" v-if="day.isToday">

                                </div>
                            </td>
                        </tr>
                    </table>

                </div>
                
            </div>
              -->
        </div>
    </div>
</template>

<script>
    import list from "./list";
    export default list;
</script>

<style src="./list.css"></style>