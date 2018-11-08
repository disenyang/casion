<template>
    <yii-modal class="yii-upload-wrapper"
        v-model="modalShow"
        :auto-size="true"
        :size="size"
        :height="panelHeight"
        :width="panelWidth"
        :appendToBody="false"
        v-on:after-leave="destroyElement">

        <template slot="title">添加成员</template>
        <div class="user-sel-wrapper">
            <div class="p-search">
                <div>
                    <input type="text" v-model="params.key" placeholder="手机号\昵称">
                    <yii-button class="search-btn" icon="search" @click="search">搜索</yii-button>
                </div>
            </div>
            <div class="list">
                <table>
                    <tr class="row" v-for="(row,index) in dataList">
                        <td style="width: 30px;">
                            <yii-checkbox type="checkbox" v-model="row.checked"></yii-checkbox>
                        </td>
                        <td style="width: 40px;">
                            <img class="headimg" :src="row.headimg?row.headimg:defaultHeadimg">
                        </td>
                        <td>
                            {{row.name}}
                        </td>
                    </tr>
                </table>
            </div>
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
    import usersel from "./usersel";
    export default usersel;
</script>

<style src="./usersel.css">
</style>