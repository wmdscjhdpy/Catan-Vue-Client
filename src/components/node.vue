<template>
    <div :style="selfstyle">
        <img :id="'node'+this.nodeid" :src="this.who[belongto][building]" :usemap="'#node-'+this.nodeid+'map'" width="40" height="40">
        <map :name="'node-'+this.nodeid+'map'">
			<area shape="circle" coords="20,20,20" href="javascript:void(0);" @click="$emit('myClick',index)">
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

    
	import gamecalc from '../components/gamecalc.js'
    export default{
        props:['P1','P2','P3','index','belongto','building'],
        data(){
            return{
                nodeid:0,
                who:{
                    '-1':{
                        blank:nobodyimg
                    },
                    0:{
                        home:bluehome,
                        city:bluecity
                    },
                    1:{
                        home:greenhome,
                        city:greencity
                    },
                    3:{
                        home:yellowhome,
                        city:yellowcity
                    },
                    2:{
                        home:redhome,
                        city:redcity
                    },
                    4:{
                        home:purplehome,
                        city:purplecity
                    },
                    5:{
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
            this.P1.x=Number(this.P1.x);
            this.P1.y=Number(this.P1.y);
            this.P2.x=Number(this.P2.x);
            this.P2.y=Number(this.P2.y);
            this.P3.x=Number(this.P3.x);
            this.P3.y=Number(this.P3.y);
            
			this.calcXYPosition();
            this.nodeid=gamecalc.calcNodeId(Array(this.P1,this.P2,this.P3));
		},
        methods:{
            calcXYPosition(){
                var P1,P2,P3,posX,posY;
                P1=gamecalc.calcHexagonMiddle(this.P1.x,this.P1.y);
                P2=gamecalc.calcHexagonMiddle(this.P2.x,this.P2.y);
                P3=gamecalc.calcHexagonMiddle(this.P3.x,this.P3.y);
                posX=Math.round((P1.x+P2.x+P3.x)/3-gamecalc.G.homeside/2);
                posY=Math.round((P1.y+P2.y+P3.y)/3-gamecalc.G.homeside/2);
                this.selfstyle.left=posX+'px';
                this.selfstyle.top=posY+'px';
            },


        }
    }
</script>