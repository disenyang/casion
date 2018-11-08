<template>
    <div :class="['yii-pagination', `is-${align}`]">
        
        </yii-select>
        <yii-button-group>
            <!-- 上一页 -->
            <a type="stroke" 
                icon="left" 
                class="prev fa-angle-left" 
                :disabled="firstPage >= currentPage"
                @click="prveClickHandler">
            </a>
            <!-- 第一页 -->
            <span class="pages"><span class="current-page ng-binding">{{currentPage}}</span><span class="ng-binding">&nbsp;/&nbsp;{{lastPage}}</span>
            </span>
            <!-- 下一页 -->
            <a type="stroke" 
                icon="right" 
                class="next fa-angle-right" 
                :disabled="lastPage <= currentPage"
                @click="nextClickHandler">
            </a>
            <input type="text" class="any-page" v-model="anyPage" >
            <button class="go-btn" @click="goPage()">前往</button>
        </yii-button-group>
        <!-- <span class="yii-pagination-text">跳转至</span> -->
        <!-- <yii-input v-model="jumperPage" @keyup.enter="jumper"></yii-input> -->
    </div>
</template>


<script>
    const DEFAULT_PAGE_SIZE = 20;
    import Utils from 'utils';
    import {middlePages} from './utils';
    export default {
        name: 'pagination',

        componentName: 'pagination',

        props: {
            value: {
                type: Number,
                default: 1,
                required: true,
            },
            totalItems: {
                type: Number,
                default: 0
            },
            itemsPerPage: {
                type: Number,
                default: 20
            },
            align: {
                type: String,
                default: 'left'
            }
        },

        data() {
            return {
                doubleLeftOn: false,
                doubleRightOn: false,
                pageSize: DEFAULT_PAGE_SIZE,
                firstPage: 1,
                currentPage: 1,
                jumperPage: 1,
                anyPage:"",
                pageSizeList: [
                    {value: 10, label: "10条/页"},
                    {value: 20, label: "20条/页"},
                    {value: 30, label: "30条/页"},
                    {value: 40, label: "40条/页"},
                    {value: 50, label: "50条/页"},
                ]
            };
        },

        created(){
            
            this.setPageSize(this.itemsPerPage);

            this.setCurrentPage(this.value);
        },

        computed: {
            _totalItems(){
                return this.totalItems < 0 ? 0 : this.totalItems;
            },
            lastPage(){
                return parseInt((this._totalItems + this.pageSize - 1) / this.pageSize) || 1;
            },
            middlePages(){
                return middlePages(this.firstPage, this.lastPage, this.currentPage);
            },
            leftMore(){
                return ( this.middlePages[0] || this.firstPage ) - this.firstPage > 1;
            },
            rightMore(){
                return this.lastPage - ( this.middlePages[this.middlePages.length - 1] || this.lastPage) > 1;
            },
        },
        methods: {
            doubleLeftEnter(){
                this.doubleLeftOn = true;
            },
            doubleLeftLeave(){
                this.doubleLeftOn = false;
            },
            doubleLeftClick(){
                let temp = this.currentPage - 5;
                temp = temp > this.lastPage ? this.lastPage : temp;
                temp = temp < this.firstPage ? this.firstPage : temp;
                this.$emit("input", temp);
                this.doubleLeftOn = false;
            },
            doubleRightEnter(){
                this.doubleRightOn = true;
            },
            doubleRightLeave(){
                this.doubleRightOn = false;
            },
            doubleRightClick(){
                let temp = this.currentPage + 5;
                temp = temp > this.lastPage ? this.lastPage : temp;
                temp = temp < this.firstPage ? this.firstPage : temp;
                this.$emit("input", temp);
                this.doubleRightOn = false;
            },
            setPageSize(itemsPerPage){
                let index = this.pageSizeList.findIndex(ele => ele.value === itemsPerPage) 
                this.pageSize = index < 0 ? DEFAULT_PAGE_SIZE : itemsPerPage;
            },
            setCurrentPage(val, mustEmit){
                if(val < this.firstPage){
                    this.$emit("input", this.firstPage);
                }else if(val > this.lastPage){
                    this.$emit("input", this.lastPage);
                }else if(mustEmit || this.currentPage !== val){
                    this.currentPage = val;
                    this.$emit("current-change", val);
                    // this.currentPage = this.currentPage < this.firstPage ? this.firstPage : this.currentPage;
                    // this.currentPage = this.currentPage > this.lastPage ? this.lastPage : this.currentPage;
                    // this.jumperPage = this.currentPage;
                }
            },
            prveClickHandler(){
                if(this.currentPage > this.firstPage){
                    this.$emit("input", this.currentPage - 1);
                }
            },
            nextClickHandler(){
                if(this.currentPage < this.lastPage){
                    this.$emit("input", this.currentPage + 1);
                }
            },
            pageClickHandler(val){
                if(val <= this.lastPage && val >= this.firstPage){
                    this.$emit("input", val);
                }
            },
            goPage(){
                this.currentPage = this.anyPage;
                this.setCurrentPage(this.anyPage, true);
            }
            // jumper(){
            //     console.log("--------jumper----------");
            // },
        },

        watch: {
            value(val){
                this.setCurrentPage(val);
            },
            // currentPage(val){
            //     this.$emit("current-change", val);
            // },
            itemsPerPage(val){
                this.setPageSize(val)
            },
            pageSize(val){
                this.$emit("page-size-change", parseInt(val));
                this.setCurrentPage(this.currentPage, true);

            },
            _totalItems(){
                this.setCurrentPage(this.currentPage);
            }
            // jumperPage(newVal, oldVal){
            //     console.log("----------jumperPage----------",newVal, oldVal);
            //     if(newVal == this.currentPage) return;

            //     if(parseInt(newVal) != newVal || newVal > this.lastPage || newVal < this.firstPage){
            //         console.log("---------old-------------",newVal, oldVal);
            //         this.jumperPage = parseInt(oldVal);
            //     }else{
            //         console.log("---------set-------------",newVal, oldVal);
            //         this.$emit("input", parseInt(newVal));
            //     }
                
            // },
        },

        mounted() {
            this.$nextTick(()=>{
                
            });
        },

        destroyed() {
        }
    }
</script>

<style>
    @import '../../styles/var.css';

    @n yii {

        @b pagination{
            box-sizing: border-box;
            display: flex;
            line-height: 36px;

            & > *{
                margin-right: 10px;
            }

            @e text{
                word-break: keep-all;
            }

            @e both{
                & .yii-icon{
                    font-weight: bold;
                    /*color: var(--color-gray60);*/
                    
                }
                &.is-disabled{
                    background-color: var(--color-white)!important;
                    pointer-events: auto!important;
                    & .yii-icon{
                        color: var(--color-gray95)!important;
                    }
                    
                }
            }

            @e current{
                color: var(--color-white)!important;
                background-color: var(--color-primary)!important;
                z-index: 1;
                border-color: var(--color-primary)!important;
            }

            @when left{
                justify-content: flex-start;
            }

            @when center{
                justify-content: center;
            }

            @when right{
                justify-content: flex-end;
            }

            & .yii-button-group{
                display: inherit;
                margin-right: 0px;
            }

            & .yii-button{
                min-width: 36px;
                padding: 0px;
                border-top-color: var(--color-gray80)!important;
                border-bottom-color: var(--color-gray80)!important;
                border-left-color: var(--color-gray90)!important;
                border-right-color: var(--color-gray90)!important;

                &:first-child{
                    border-left-color: var(--color-gray80)!important;
                }

                &:last-child{
                border-right-color: var(--color-gray80)!important;
                }

                & .is-disabled{
                    background-color: var(--color-white);
                    border-color: var(--color-gray80);
                }

                &.yii-pagination-current{
                    border-color: var(--color-primary)!important;
                    z-index: 2;
                }
            }

            & .yii-select{
                width: 100px;
                text-align: center;
            }

            & .yii-input{
                width: 50px;
            }
            & .yii-input-el{
                text-align: center;
                color: var(--color-gray80);
            }
            .any-page{
                display: inline-block;
                vertical-align: middle;
                padding: 0px;
                height: 30px;
                line-height: 30px;
                width: 80px;
                margin-left: 10px;
                box-sizing: border-box;
                margin-right: 10px;
                outline:none;
                padding-left: 10px;
                color: #666;
                font-size: 12px;
            }
            .go-btn{
                display: inline-block;
                vertical-align: middle;
                height: 30px;
                line-height: 30px;
                width: 50px;
                border:1px solid #ccc;
                background-color: transparent;
                border-radius: 0px;
                color: #ccc;
                font-size: 12px;
                cursor: pointer;
                outline: none;
            }
            .prev{
                display: inline-block;
                vertical-align: middle;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 18px;
                color: #666;
                border: 1px solid #ccc;
                background: #fff;
                border-radius: 2px;
                text-decoration: none;
                cursor: pointer;
                box-sizing: border-box;
                &:hover{
                    background-color:#eee;
                }
            }
            .next{
                cursor: pointer;
                display: inline-block;
                vertical-align: middle;
                width: 30px;
                box-sizing: border-box;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 18px;
                color: #666;
                border: 1px solid #ccc;
                background: #fff;
                border-radius: 2px;
                text-decoration: none;
                &:hover{
                    background-color:#eee;
                }
            }
            .current-page {
                color: #666;
            }
            .fa-angle-left,.fa-angle-right{
                position: relative;
            }
            .fa-angle-left:before {
                position: absolute;
                display: inline-block;
                width: 10px;
                height: 1px;
                background: #666;
                content: "";
                left: 10px;
                top: 11px;
                transform: rotate(-30deg);
            }
            .fa-angle-left:after {
                position: absolute;
                display: inline-block;
                width: 10px;
                height: 1px;
                background: #666;
                content: "";
                left: 10px;
                top: 16px;
                transform: rotate(30deg);
            }
            .fa-angle-right:before {
                content: ">";
                line-height: 30px;
            }


            .fa-angle-right:before {
                position: absolute;
                display: inline-block;
                width: 10px;
                height: 1px;
                background: #666;
                content: "";
                left: 10px;
                top: 16px;
                transform: rotate(-30deg);
            }
            .fa-angle-right:after {
                position: absolute;
                display: inline-block;
                width: 10px;
                height: 1px;
                background: #666;
                content: "";
                left: 10px;
                top: 11px;
                transform: rotate(30deg);
            }
           
            .pages{
                padding: 0 20px;
                display: inline-block;
                vertical-align: middle;
                color: #ccc;
                font-size: 12px;
                background-color: transparent;
                border:0px;

            }
        }
    }
</style>