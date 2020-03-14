<template>
    <div>     
        <div v-for="index of 5" :key="index-1" :style="'position:absolute;left:'+Number(80*(index-1))+'px;top:0px;text-align: center'">
            <img v-if="tobechange==index-1" :src="change" width="35" height="35" style="position:absolute">
            <img :src="ico[index-1]" width="80" height="64" @click="iconClick(index-1)" @contextmenu.prevent="iconRightClick(index-1)"/>
            <br>
            <span v-if="!robflag" class="shownum">{{resources[list[index-1]]}}</span>
        </div>
    </div>

</template>
<script>
import forestico from '../assets/icon/forest.png'
import wheatico from '../assets/icon/wheat.png'
import ironico from '../assets/icon/iron.png'
import stoneico from '../assets/icon/stone.png'
import grassico from '../assets/icon/grass.png'
import changeico from '../assets/icon/change.png'
export default {
    props:['resources','robflag'],
    data() {
        return {
            change:changeico,
            tobechange:-1,//准备作为交换的资源索引
            ico:Array(forestico,ironico,grassico,wheatico,stoneico),
            roblist:Array(0,0,0,0,0),//作为需要上缴的物资列表
            list:Array('forest','iron','grass','wheat','stone','solders','harvest','monopoly','roadbuilding','winpoint')
        }
    },
    methods:{
        iconClick(index)
        {
            if(this.robflag)//上缴资源功能
            {
                this.roblist[index]+=1;
            }else{//交换资源功能
                if(this.tobechange==-1)//还未选中任何被交换资源
                {
                    this.tobechange=index;
                }else if(this.tobechange==index)//取消选中
                {
                    this.tobechange=-1;
                }else{//选中第二个资源，提交交换请求
                    if(this.resources[this.list[this.tobechange]]>=4)
                    {
                        this.$emit('myClick',this.tobechange,index);
                    }else{
                        alert('你用于交换的资源不足！');
                    }
                }
            }
        },
        iconRightClick(index)
        {
            alert('right click');
            if(this.robflag)//上缴资源功能
            {
                this.roblist[index]-=1;
                if(this.roblist[index]<0)this.roblist[index]=0;
            }
        }
    }
}
</script>
<style>
.shownum{
    font-size:24px;
}
</style>