<!-- Created by gaoyang 工作记录列表页面-->
<template>
    <div class="workrecord-home-wrapper">
        <div class="workrecord-nodata" v-if="dataList.length==0">
            您还没有加入团队，请联系您的团队leader.
        </div>
        <div class="team-title" v-if="dataList.length!=0">
            <span class="name">{{team.name}}</span> <span class="num">共{{dataList.length}}人</span>
        </div>
        <div class="workrecord-list">
            <div class="workrecord" v-for="(row,index) in dataList" @click="goList(row)">
                <div class="headimg"><img :src="row.headimg||defaultHeadimg"></div>
                <div class="name">{{row.name}}</div>

                <div class="wmy" v-if="!row.loading">
                    <div class="one wwrnum">
                        <div class="num">
                            {{row.weekcount}}
                        </div>
                        <div class="columner">
                        </div>
                        <div class="title">
                            本周
                        </div>
                    </div>
                    <div class="one mwrnum">
                        <div class="num">
                            {{row.monthcount}}
                        </div>
                        <div class="columner">
                            
                        </div>
                        <div class="title">
                            本月
                        </div>
                    </div>
                    <div class="one ywrnum">
                        <div class="num">
                            {{row.yearcount}}
                        </div>
                        <div class="columner">
                            
                        </div>
                        <div class="title">
                            本年
                        </div>
                    </div>
                </div>
                <div class="loading" v-if="row.loading">
                    <yii-icon name="loading-3-quarters" style="font-size:30px;"></yii-icon>
                </div>
                <div class="edit-btn" v-if="row.owner == userinfo.id">
                    <yii-button icon="edit" type="text" @click="updateGo(row)"></yii-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import home from "./home";
    export default home;
</script>

<style src="./home.css"></style>