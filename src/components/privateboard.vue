<template>
    <div>     
        <div v-for="index of 5" :key="index-1" :style="'position:absolute;left:'+Number(80*(index-1))+'px;top:0px;text-align: center'">
            <img v-if="tobechange==index-1" :src="change" width="35" height="35" style="position:absolute">
            <img :src="ico[index-1]" width="80" height="64" @click="iconClick(index-1)" @contextmenu.prevent="iconRightClick(index-1)"/>
            <br>
            <span class="shownum">{{resources[list[index-1]]}}</span><span v-if="boardflag" class="shownum" style="color:red">- {{sublist[index-1]}}</span>
        </div>
        <button v-if="boardflag " @click="submitRes()" style="resize:none;font-size:16px;position:absolute;left:400px;top:10px;">上缴（{{robsum}}）</button>
        <div style="position:absolute;left:0px;top:100px;width:500px;">
            <button @click="useCard(8)" class="normalbtn">道路建设({{resources['roadbuilding']}})</button>
            <button @click="useCard(6)" class="normalbtn">丰收之年({{resources['harvest']}})</button>
            <button @click="useCard(7)" class="normalbtn">垄断({{resources['monopoly']}})</button>
            <button @click="useCard(5)" class="normalbtn">士兵({{resources['solders']}})</button>
            <button  class="normalbtn">建筑物({{resources['winpoint']}})</button>
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
    props:['resources','boardflag'],
    data() {
        return {
            change:changeico,
            tobechange:-1,//准备作为交换的资源索引
            ico:Array(forestico,ironico,grassico,wheatico,stoneico),
            //botlist:[0,0,0,0,0],
            sublist:{0:0,1:0,2:0,3:0,4:0},//作为参数选取时的存储器
            list:Array('forest','iron','grass','wheat','stone','solders','harvest','monopoly','roadbuilding','winpoint')
        }
    },
    computed:{
        robsum(){
            var sum=0;
            for(var i=0;i<5;i++)
            {
                sum+=this.sublist[i];
            }
            return sum;
        }
    },
    methods:{
        iconClick(index)
        {
            if(this.boardflag==1)//上缴资源功能
            {
                this.sublist[index]+=1;
                if(this.sublist[index]>this.resources[this.list[index]])this.sublist[index]=this.resources[this.list[index]];
            }else if(this.boardflag==0){//交换资源或选取资源功能
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
            if(this.boardflag)//上缴资源功能
            {
                this.sublist[index]-=1;
                if(this.sublist[index]<0)this.sublist[index]=0;
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
                this.$emit('discard',this.sublist);
                for(i=0;i<5;i++)//清空sublist
                {
                    this.sublist[i]=0;
                }
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
.normalbtn{
    font-size:16px;
}
</style>