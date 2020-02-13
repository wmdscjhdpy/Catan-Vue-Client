<template>
    <div :style="selfstyle">
        <img :id="'node'+this.nodeid" :src="this.who[this.belongto][this.building]" :usemap="'#node-'+this.nodeid+'map'" width="40" height="40">
        <map :name="'node-'+this.nodeid+'map'">
			<area shape="circle" coords="20,20,20" href="javascript:void(0);" :onclick="'alert(`this is a node   '+this.nodeid+'`)'">
		</map>
    </div>
</template>

<script>
    import nobodyimg from '../assets/nobody.png'
    import bluehome from '../assets/home/blue.png'
    import redhome from '../assets/home/red.png'
    import purplehome from '../assets/home/purple.png'
    import skyhome from '../assets/home/sky.png'
    import yellowhome from '../assets/home/yellow.png'
    import greenhome from '../assets/home/green.png'

    import bluecity from '../assets/city/blue.png'
    import redcity from '../assets/city/red.png'
    import purplecity from '../assets/city/purple.png'
    import skycity from '../assets/city/sky.png'
    import yellowcity from '../assets/city/yellow.png'
    import greencity from '../assets/city/green.png'
    export default{
        props:['x1','y1','x2','y2','x3','y3'],
        data(){
            return{
                nodeid:0,
                belongto:"nobody",
                building:"blank",
                who:{
                    nobody:{
                        blank:nobodyimg
                    },
                    blue:{
                        home:bluehome,
                        city:bluecity
                    },
                    green:{
                        home:greenhome,
                        city:greencity
                    },
                    yellow:{
                        home:yellowhome,
                        city:yellowcity
                    },
                    red:{
                        home:redhome,
                        city:redcity
                    },
                    purple:{
                        home:purplehome,
                        city:purplecity
                    },
                    sky:{
                        home:skyhome,
                        city:skycity
                    }
                },
                selfstyle:{							//用于改变样式
					position:'absolute',
					left:0+'px',
					top:0+'px',
				}
            }
        },
        beforeMount(){
            //保证作为Number处理
            this.x1=Number(this.x1);
            this.y1=Number(this.y1);
            this.x2=Number(this.x2);
            this.y2=Number(this.y2);
            this.x3=Number(this.x3);
            this.y3=Number(this.y3);
            
			this.calcXYPosition();
            this.calcNodeId();
		},
        methods:{
            calcXYPosition(){
                var P1,P2,P3,posX,posY;
                P1=this.calcBlockMiddle(this.x1,this.y1);
                P2=this.calcBlockMiddle(this.x2,this.y2);
                P3=this.calcBlockMiddle(this.x3,this.y3);
                posX=Math.round((P1.x+P2.x+P3.x)/3-this.G.homeside/2);
                posY=Math.round((P1.y+P2.y+P3.y)/3-this.G.homeside/2);
                this.selfstyle.left=posX+'px';
                this.selfstyle.top=posY+'px';
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
            },
            calcNodeId(){//给每一个节点一个唯一编号
                var X,Y;
                X=(this.x1+this.x2+this.x3)/3;
                Y=(this.y1+this.y2+this.y3)/3;
                this.nodeid='node-x'+String(X.toFixed(2))+'y'+String(Y.toFixed(2));
                this.nodeid=String(this.nodeid).replace(/\./g,'d');
            }
        }
    }
</script>