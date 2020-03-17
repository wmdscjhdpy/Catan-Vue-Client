<template>
    <div :style="mystyle">
        <div :style="imgstyle">
        <img :src="ico[kind]" width="70" height="56">
        <br>
        <span v-if="kind!=5" style="font-size:20px;">2:1</span>
        <span v-if="kind==5" style="font-size:20px;">3:1</span>
        </div>
    </div>
</template>

<script>
import forestico from '../assets/icon/forest.png'
import wheatico from '../assets/icon/wheat.png'
import ironico from '../assets/icon/iron.png'
import stoneico from '../assets/icon/stone.png'
import grassico from '../assets/icon/grass.png'
import anyico from '../assets/icon/any.png'
import gamecalc from '../components/gamecalc.js'
export default {
    data() {
        return {
            ico:Array(forestico,ironico,grassico,wheatico,stoneico,anyico),
        }
    },
    computed: {
        mystyle(){
            var posY,posX;
            posX=gamecalc.G.middleX+(gamecalc.G.hexagonhigh+gamecalc.G.roadside)*this.P.x;
            if(this.P.y%2)//需要偏移的情况 x正负影响偏移正负
            {
                if(this.P.x>0)posX-=(gamecalc.G.hexagonhigh+gamecalc.G.roadside)/2;
                else posX+=(gamecalc.G.hexagonhigh+gamecalc.G.roadside)/2;
            }
            posY=gamecalc.G.middleY-(gamecalc.G.hexagonside/2*3+gamecalc.G.roadside)*this.P.y;
            return{
                position:'absolute',
                left:posX+'px',
                top:posY+'px',
            }
        },
        imgstyle(){
            var posx,posy;
            switch(this.deg)
            {
                case 0:
                    posx=gamecalc.G.hexagonside*1.6;
                    posy=gamecalc.G.hexagonhigh/2;
                break;
                case 60:
                    posx=gamecalc.G.hexagonside*1.3;
                    posy=gamecalc.G.hexagonhigh/4;
                break;
                case 120:
                    posx=gamecalc.G.hexagonside*0.7;
                    posy=gamecalc.G.hexagonhigh/4;
                break;
                case 180:
                    posx=gamecalc.G.hexagonside*0.4;
                    posy=posy=gamecalc.G.hexagonhigh/2;
                break;
                case 240:
                    posx=gamecalc.G.hexagonside*0.7;
                    posy=gamecalc.G.hexagonhigh*3/4;
                break;
                case 300:
                    posx=gamecalc.G.hexagonside*1.3;
                    posy=gamecalc.G.hexagonhigh*3/4;
                break;
            }
            posx-=35;
            posy-=28;
            //微调
            posy-=5;
            //if(this.deg>180)posy-=5;
            return{
                position:'absolute',
                left:posx+'px',
                top:posy+'px',
                'text-align':'center'
            }
        }
    },
    props:['P','deg','kind'],
    methods: {
        calcHexagonPosition() {
            var posY,posX;
            posX=gamecalc.G.middleX+(gamecalc.G.hexagonhigh+gamecalc.G.roadside)*this.P.x;
            if(this.P.y%2)//需要偏移的情况 x正负影响偏移正负
            {
                if(this.P.x>0)posX-=(gamecalc.G.hexagonhigh+gamecalc.G.roadside)/2;
                else posX+=(gamecalc.G.hexagonhigh+gamecalc.G.roadside)/2;
            }
            posY=gamecalc.G.middleY-(gamecalc.G.hexagonside/2*3+gamecalc.G.roadside)*this.P.y;
            this.selfstyle.left=posX+'px';
            this.selfstyle.top=posY+'px';
        }
    },
}
</script>