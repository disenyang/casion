<!-- Created by gaoyang 公司详情页面-->
<template>
    <div class="company-detail-wrapper">
        <div class="company-detail">
            <div class="logo">
                <img :src="company.logo">
                <span>{{company.name}}</span>
                <span class="site">网址：{{company.site}}</span>
                <span class="usernum">用户数量：{{company.usernum}}</span>
                <yii-button icon="plus" class="my-btn"  type="solid" @click="addCompany">申请加入</yii-button>
            </div>
           
            <div class="remark">    
                {{company.remark}}
            </div>
        </div>
        <yii-button icon="plus" type="text" @click="gotoNewTeam">创建团队</yii-button>
        <div class="team-list">
            <div class="team" v-for="(row,index) in company.teams" @click="goTeamDetail(row)">
                <div class="logo"><img :src="row.logo"></div>
                <div class="name">{{row.name}}</div>
                
                <div class="select-users">
                    <div class="user" v-for="(user,index) in row.users">
                        <div class="headimg">
                            <img :src="user.headimg||defaultHeadimg">
                        </div>
                        <div class="nickname">
                            <span>{{user.name || user.nickname}}</span>
                        </div>
                        <div class="del-btn" v-if="false" @click="delUser(index)"></div>
                    </div>
                </div>
                <div class="owner">管理员：{{row.createusername}}</div>
                <div class="edit-btn" v-if="row.owner == userinfo.id">
                    <yii-button icon="edit" type="text" @click.stop="updateTeamGo(row)"></yii-button>
                </div>
            </div>
        </div>


        <div class="user-list">
            <div class="caption">用户列表</div>
            <div class="users">
                <div class="user" v-for="(user,index) in company.users">
                    <div class="headimg">
                        <img :src="user.headimg||defaultHeadimg">
                    </div>
                    <div class="name">
                        <span>{{user.name}}</span>
                    </div>
                    <div class="nickname">
                        <span>({{user.nickname}})</span>
                    </div>
                    <div class="del-btn" v-if="company.owner == userinfo.id" @click="delUser(index)"></div>
                </div>
            </div>
        </div>
           
       
    </div>
</template>

<script>
    import detail from "./detail";
    export default detail;
</script>

<style src="./detail.css"></style>