<template>
    <div :class="'road'+String(this.P1.x)+String(this.P1.y)+String(this.P2.x)+String(this.P2.y)" :style="this.selfstyle" :onclick="'alert(`this is a'+this.roadid+'`)'">
    </div>
</template>

<script>
import gamecalc from './gamecalc';

export default {
    props:['P1','P2'],
    data(){
        return{
            roadid:0,
            selfstyle:{
                position:'absolute',
                left:0+'px',
                top:0+'px',
                width: gamecalc.G.roadside+2+'px',
                height: gamecalc.G.hexagonside-20+'px',
                background: 'green',
                transform:'rotate('+0+'deg)'
            }
        }
    },
    beforeMount(){
        //保证传入数据为Number
        this.P1.x=Number(this.P1.x);
        this.P2.x=Number(this.P2.x);
        this.P1.y=Number(this.P1.y);
        this.P2.y=Number(this.P2.y);
        //初始化位置以及角度
        this.calcRoadId();
        this.calcPositionAndDeg();
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
            posY-=(gamecalc.G.hexagonside-20)/2;
            this.selfstyle.left=posX+'px';
            this.selfstyle.top=posY+'px';
            this.selfstyle.transform='rotate('+this.calcRotateDeg()*-60+'deg)';
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
        calcRoadId(){//给每一个节点一个唯一编号
            var X,Y;
            X=(this.P1.x+this.P2.x)/2;
            Y=(this.P1.y+this.P2.y)/2;
            this.roadid='road-x'+String(X.toFixed(2))+'y'+String(Y.toFixed(2));
            this.roadid=String(this.roadid).replace(/\./g,'d');
        }
    }

}
</script>
