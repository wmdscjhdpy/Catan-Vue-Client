<template>
    <div :class="'road'+String(this.x1)+String(this.y1)+String(this.x2)+String(this.y2)" :style="this.selfstyle" :onclick="'alert(`this is a road'+'  x1:'+this.x1+'  y1:'+this.y1+'  x2:'+this.x2+'  y2:'+this.y2+'`)'">
    </div>
</template>

<script>
export default {
    props:['x1','y1','x2','y2'],
    data(){
        return{
            selfstyle:{
                position:'absolute',
                left:0+'px',
                top:0+'px',
                width: this.G.roadside+2+'px',
                height: this.G.hexagonside-20+'px',
                background: 'red',
                transform:'rotate('+0+'deg)'
            }
        }
    },
    beforeMount(){
        //保证传入数据为Number
        this.x1=Number(this.x1);
        this.x2=Number(this.x2);
        this.y1=Number(this.y1);
        this.y2=Number(this.y2);
        //初始化位置以及角度
        this.calcPositionAndDeg();
	},
    methods:{
        calcPositionAndDeg(){
            var pos1,pos2,posX,posY;
            pos1=this.calcBlockMiddle(this.x1,this.y1);
            pos2=this.calcBlockMiddle(this.x2,this.y2);
            posX=Math.round((pos1['x']+pos2['x'])/2);
            posY=Math.round((pos1['y']+pos2['y'])/2);
            //坐标位置移至左上角
            posX-=(this.G.roadside+2)/2;
            posY-=(this.G.hexagonside-20)/2;
            this.selfstyle.left=posX+'px';
            this.selfstyle.top=posY+'px';
            this.selfstyle.transform='rotate('+this.calcRotateDeg()*-60+'deg)';
        },
        ///计算道路旋转角度
        calcRotateDeg(){
            if(this.y1==this.y2)return 0;//不需要旋转
            var result;//1代表\这样-1代表/这样
            var X1=Math.abs(this.x1);
            var X2=Math.abs(this.x2);
            
            if(X1==X2)//假定x1在外面
            {
                //以下假定y1>y2进行推理
                if(Math.abs(this.y1)%2)X1-=0.5;//添加内偏移
                if(Math.abs(this.y2)%2)X2-=0.5;
                if(X1-X2>0)result=1;
                else result=-1;
                if(Math.abs(this.y1)<Math.abs(this.y2))
                    result*=-1;//如果不符合假设则反相结果
            }else{//存在x之差
                //假定X1>X2
                if(Math.abs(this.y1)>Math.abs(this.y2))result=1;
                else result=-1;
                if(X2>X1)result*=-1;
            }
            result*=(Math.sign((this.x1+this.x2)*Math.sign(this.y1+this.y2)));//依据对称性进行转换
            return result;
        },
        ///计算对应坐标的六边形块在页面中的中心坐标
        calcBlockMiddle(blockx,blocky) {
            var posY,posX;
            posX=this.G.middleX+(this.G.hexagonhigh+this.G.roadside)*blockx;
            if(blocky%2)//需要偏移的情况 x正负影响偏移正负
            {
                if(blockx>0)posX-=(this.G.hexagonhigh+this.G.roadside)/2;
                else posX+=(this.G.hexagonhigh+this.G.roadside)/2;
            }
            posY=this.G.middleY-(this.G.hexagonside/2*3+this.G.roadside)*blocky;

            posX+=(this.G.hexagonside);
            posY+=(this.G.hexagonside);
            return {x:posX,y:posY};
        }
    }

}
</script>
