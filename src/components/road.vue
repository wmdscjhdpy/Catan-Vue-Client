<template>
    <div :class="'road'+index" :style="roadstyle" @click="$emit('myClick',index)">
    </div>
</template>

<script>
import gamecalc from './gamecalc';

export default {
    props:['P1','P2','index','belongto'],
    data(){
        return{

        }
    },
    beforeMount(){
        //保证传入数据为Number
        this.P1.x=Number(this.P1.x);
        this.P2.x=Number(this.P2.x);
        this.P1.y=Number(this.P1.y);
        this.P2.y=Number(this.P2.y);
        //初始化位置以及角度
    },
    computed:{
        roadstyle:function(){
            var color={'-1':'white',0:'#0000ff',1:'#00ff00',2:'#ff0000',3:'#ffff00'};
            var pos=this.calcPositionAndDeg();
            return {
                position:'absolute',
                left:pos.posX+'px',
                top:pos.posY+'px',
                width: gamecalc.G.roadside+2+'px',
                height: gamecalc.G.hexagonside-30+'px',
                background:color[this.belongto],
                transform:'rotate('+pos.Deg+'deg)',
                cursor:'pointer'
            }
        }
    },
    methods:{
        calcPositionAndDeg(){
            var pos1,pos2,posX,posY;
            pos1=gamecalc.calcHexagonMiddle(this.P1.x,this.P1.y);
            pos2=gamecalc.calcHexagonMiddle(this.P2.x,this.P2.y);
            posX=Math.round((pos1.x+pos2.x)/2);
            posY=Math.round((pos1.y+pos2.y)/2);
            //坐标位置移至左上角
            posX-=(gamecalc.G.roadside+2)/2;
            posY-=(gamecalc.G.hexagonside-30)/2;
            return{
                posX,
                posY,
                Deg:this.calcRotateDeg()*-60
            }
        },
        ///计算道路旋转角度
        calcRotateDeg(){
            if(this.P1.y==this.P2.y)return 0;//不需要旋转
            var result;//1代表\这样-1代表/这样
            var X1=Math.abs(this.P1.x);
            var X2=Math.abs(this.P2.x);
            
            if(X1==X2)//假定x1在外面
            {
                //以下假定y1>y2进行推理
                if(Math.abs(this.P1.y)%2)X1-=0.5;//添加内偏移
                if(Math.abs(this.P2.y)%2)X2-=0.5;
                if(X1-X2>0)result=1;
                else result=-1;
                if(Math.abs(this.P1.y)<Math.abs(this.P2.y))
                    result*=-1;//如果不符合假设则反相结果
            }else{//存在x之差
                //假定X1>X2
                if(Math.abs(this.P1.y)>Math.abs(this.P2.y))result=1;
                else result=-1;
                if(X2>X1)result*=-1;
            }
            result*=(Math.sign((this.P1.x+this.P2.x)*Math.sign(this.P1.y+this.P2.y)));//依据对称性进行转换
            return result;
        },

    }

}
</script>
