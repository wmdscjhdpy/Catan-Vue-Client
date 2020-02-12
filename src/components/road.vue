<template>
    <div >

    </div>
</template>

<script>
export default {
    props:['x','y'],
    methods:{
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
            posX+=(this.G.hexagonside)/2;
            posY+=(this.G.hexagonside)/2;
            return{
                posX,
                posY
            }
        }
    }

}
</script>