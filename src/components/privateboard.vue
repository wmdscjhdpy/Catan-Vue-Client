<template>
    <div>     
        <div v-for="index of 5" :key="index-1" :style="'position:absolute;left:'+Number(80*(index-1))+'px;top:0px;text-align: center'">
            <img v-if="tobechange==index-1" :src="change" width="35" height="35" style="position:absolute">
            <img :src="ico[index-1]" width="80" height="64" @click="iconClick(index-1)" @contextmenu.prevent="iconRightClick(index-1)"/>
            <br>
            <span class="shownum">{{resources[list[index-1]]}}</span><span v-if="robflag" class="shownum" style="color:red">- {{roblist[index-1]}}</span>
        </div>
        <button v-if="robflag " @click="submitRes()" style="resize:none;font-size:16px;position:absolute;left:400px;top:10px;">上缴（{{robsum}}）</button>
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
            //botlist:[0,0,0,0,0],
            roblist:{0:0,1:0,2:0,3:0,4:0},//作为需要上缴的物资列表
            list:Array('forest','iron','grass','wheat','stone','solders','harvest','monopoly','roadbuilding','winpoint')
        }
    },
    computed:{
        robsum(){
            var sum=0;
            for(var i=0;i<5;i++)
            {
                sum+=this.roblist[i];
            }
            return sum;
        }
    },
    methods:{
        iconClick(index)
        {
            if(this.robflag)//上缴资源功能
            {
                this.roblist[index]+=1;
                if(this.roblist[index]>this.resources[this.list[index]])this.roblist[index]=this.resources[this.list[index]];
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
            if(this.robflag)//上缴资源功能
            {
                this.roblist[index]-=1;
                if(this.roblist[index]<0)this.roblist[index]=0;
            }
        },
        submitRes()
        {
            var ressum=0;
            for(var i=0;i<5;i++)
            {
                ressum+=this.resources[this.list[i]];
            }
            if(this.robsum==Math.floor(ressum/2))
            {
                this.$emit('discard',this.roblist);
                //清零
            }else{
                alert("你上缴的资源数目不正确，需要上缴的资源："+String(Math.floor(ressum/2)))
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