<template>
    <div>     
        <div v-for="index of 5" :key="index-1" :style="'position:absolute;left:'+Number(80*(index-1))+'px;top:0px;text-align: center'">
            <img v-if="tobechange==index-1" :src="change" width="35" height="35" style="position:absolute">
            <img :src="ico[index-1]" width="80" height="64" @click="iconClick(index-1)" @contextmenu.prevent="iconRightClick(index-1)"/>
            <br>
            <span class="shownum">{{mydata['resources'][list[index-1]]}}</span>
            <span v-if="(extra==1 && ressum>=7)" class="shownum" style="color:red">- {{sublist[index-1]}}</span>
            <span v-if="(extra==6 && myturn)" class="shownum" style="color:green">+ {{sublist[index-1]}}</span>

            <span v-if="(extra===0 && tobechange===index-1)" class="shownum" style="color:red">- {{changelost}}</span>

            <span v-if="(trade || tradeswitch) && sublist[index-1]>0" class="shownum" style="color:green">+ {{sublist[index-1]}}</span>
            <span v-if="(trade || tradeswitch) && sublist[index-1]<0" class="shownum" style="color:red">{{sublist[index-1]}}</span>
        </div>
        <button v-if="extra==1 && ressum>=7" @click="submitRes()" style="resize:none;font-size:16px;position:absolute;left:400px;top:10px;">上缴（{{subsum}}/{{Math.floor(ressum/2)}}）</button>
        <button v-if="extra==6 && myturn" @click="submitRes()" style="resize:none;font-size:16px;position:absolute;left:400px;top:10px;">获得（{{subsum}}/2）</button>
        <div style="position:absolute;left:0px;top:100px;width:500px;">
            <div v-if="!tradeswitch" style="float:left;">
            <button @click="$emit('useCard',8)" class="normalbtn">道路建设({{mydata['resources']['roadbuilding']}})</button>
            <button @click="$emit('useCard',6)" class="normalbtn">丰收之年({{mydata['resources']['harvest']}})</button>
            <button @click="$emit('useCard',7)" class="normalbtn">垄断({{mydata['resources']['monopoly']}})</button>
            <button @click="$emit('useCard',5)" class="normalbtn">士兵({{mydata['resources']['solders']}})</button>
            <button  class="normalbtn">加分卡({{mydata['resources']['winpoint']}})</button>
            </div>
            <button v-if="!tradeswitch && extra===0 && myturn" @click="tradeswitch=true" class="normalbtn">打开贸易</button>
            <button v-if="tradeswitch" @click="tradeswitch=false" class="normalbtn">中止贸易</button>
            <div v-if="trade || tradeswitch" style="float:left;">
                <button v-if="myturn" @click="$emit('tradeCtl',{head:'open',data:sublist})" class="normalbtn">提交贸易请求</button>
                <button v-if="!myturn" @click="$emit('tradeCtl',{head:'accepted'})" class="normalbtn">接受交易</button>
                <button v-if="!myturn" @click="$emit('tradeCtl',{head:'rejected'})" class="normalbtn">拒绝交易</button>
            </div>

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
import gamecalc from './gamecalc'
export default {
    props:['mydata','extra','myturn','trade'],
    data() {
        return {
            change:changeico,
            tradeswitch:false,//主动交易开关
            tobechange:-1,//准备作为交换的资源索引
            ico:Array(forestico,ironico,grassico,wheatico,stoneico),
            sublist:{0:0,1:0,2:0,3:0,4:0},//作为参数选取时的存储器
            list:Array('forest','iron','grass','wheat','stone','solders','harvest','monopoly','roadbuilding','winpoint')
        }
    },
    watch:{
        trade(newvalue,oldvalue)
        {
            if(newvalue==null)//由服务器关闭交易
            {
                this.tradeswitch=false;
            }else{
                if(this.tradeswitch)//如果是交易主的话就没必要反转值了
                return;
                for(var i=0;i<5;i++)
                {
                    this.sublist[i]=-newvalue['tradelist'][i];
                }
            }
        },
        tradeswitch(newvalue,oldvalue)
        {
            if(newvalue==false)
            {
                for(var i=0;i<5;i++)
                {
                    this.sublist[i]=0;
                }
            }
        }
    },
    computed:{
        subsum(){//子列表的和
            var sum=0;
            for(var i=0;i<5;i++)
            {
                sum+=this.sublist[i];
            }
            return sum;
        },
        ressum(){//资源数和
            var sum=0;
            for(var i=0;i<5;i++)
            {
                sum+=this.mydata['resources'][this.list[i]];
            }
            return sum;
        },
        changelost()//选中的交换资源需要的数量
        {
            if(this.tobechange===-1)return -1;
            else{
                if(this.mydata['port'].indexOf(this.tobechange)!==-1)//存在这个港口
                {
                    return 2;
                }else if(this.mydata['port'].indexOf(5)!==-1){
                    return 3;
                }else{
                    return 4;
                }
            }
        }
    },
    methods:{
        iconClick(index)
        {
            if(this.extra==1 && this.ressum>=7)//上缴资源功能
            {
                this.sublist[index]+=1;
                if(this.sublist[index]>this.mydata['resources'][this.list[index]])this.sublist[index]=this.mydata['resources'][this.list[index]];
                if(this.subsum>Math.floor(this.ressum/2))this.sublist[index]-=1;
            }else if(this.tradeswitch){//贸易功能
                this.sublist[index]+=1;
            }else if(this.extra==0){//交换资源或选取资源功能
                if(this.tobechange==-1)//还未选中任何被交换资源
                {
                    this.tobechange=index;
                }else if(this.tobechange==index)//取消选中
                {
                    this.tobechange=-1;
                }else{//选中第二个资源，提交交换请求
                    this.$emit('myClick',{lost:this.changelost,input:this.tobechange,output:index});
                }
            }else if(this.extra==6 && this.myturn)//丰收之年功能
            {
                this.sublist[index]+=1;
            }else if(this.extra==7 && this.myturn)//垄断功能
            {
                this.$emit('myClick',index);
            }
        },
        iconRightClick(index)
        {
            if((this.extra==1 && this.ressum>=7)
            || (this.extra==6 && this.myturn))//上缴资源功能,丰收之年,贸易的处理
            {
                this.sublist[index]-=1;
                if(this.sublist[index]<0)this.sublist[index]=0;
            }else if(this.tradeswitch)
            {
                this.sublist[index]-=1;
                if(Math.abs(this.sublist[index])>this.mydata['resources'][gamecalc.G.reslist[index]])
                {
                    this.sublist[index]=-this.mydata['resources'][gamecalc.G.reslist[index]];
                }
            }
        },
        submitRes()
        {
            var i;
            switch(this.extra)
            {
                case 1://强盗上缴
                    if(this.subsum==Math.floor(this.ressum/2))
                    {
                        this.$emit('myClick',this.sublist);
                        for(i=0;i<5;i++)//清空sublist
                        {
                            this.sublist[i]=0;
                        }
                    }else{
                        alert("你上缴的资源数目不正确，需要上缴的资源："+String(Math.floor(this.ressum/2)));
                    }
                break;
                case 6://丰收之年
                    if(this.subsum==2)
                    {
                        this.$emit('myClick',this.sublist);
                        for(i=0;i<5;i++)//清空sublist
                        {
                            this.sublist[i]=0;
                        }
                    }else{
                        alert("你资源还没拿够或者拿多了！应拿两个任意资源");
                    }
                break;
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