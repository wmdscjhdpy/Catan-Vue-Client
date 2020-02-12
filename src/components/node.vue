<template>
    <div :style="selfstyle">
        <img :src="this.who[this.belongto][this.building]" :usemap="'#node'+String(this.x)+String(this.y)+'map'" width="40" height="40">
        <map :name="'node'+String(this.x)+String(this.y)+'map'">
			<area shape="circle" coords="20,20,20" href="javascript:void(0);" :onclick="'alert(`this is a node   '+'x:'+this.x+'  y:'+this.y+'`)'">
		</map>
    </div>
</template>>

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
        props:['x','y'],
        data(){
            return{
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
			this.calcXYPosition();
		},
        methods:{
            calcXYPosition(){
                var posY,posX;
                posX=this.G.middleX+this.G.hexagonside-this.G.homeside/2+(this.G.hexagonhigh+this.G.roadside)/2*this.x;
                if(this.y>0)posY=this.G.middleY-this.G.roadside/2-this.G.homeside/2-(this.G.hexagonside/2*3+this.G.roadside)*(this.y-1);
                    else posY=this.G.middleY+this.G.hexagonside*2+this.G.roadside-this.G.homeside-(this.G.hexagonside/2*3+this.G.roadside)*(Number(this.y)+1);
                if(!(Math.abs(0+Number(this.x)+Number(this.y))%2))
                {
                    //alert(Math.abs(0+Number(this.x)+Number(this.y)));
                    posY+=50*Math.sign(this.y);
                }
                this.selfstyle.left=posX+'px';
                this.selfstyle.top=posY+'px';
            }
        }
    }
</script>