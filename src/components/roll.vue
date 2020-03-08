<template>
    <div style="cursor:pointer;" @click="$emit('myClick')">
        <img :src="roll[num[0]]" height="100" width="100" style="position:absolute;left:0px;top:0px;"/>
        <img :src="roll[num[1]]" height="100" width="100" style="position:absolute;left:120px;top:0px;"/>
    </div>
</template>

<script>
import roll0 from '../assets/roll/0.jpg'
import roll1 from '../assets/roll/1.jpg'
import roll2 from '../assets/roll/2.jpg'
import roll3 from '../assets/roll/3.jpg'
import roll4 from '../assets/roll/4.jpg'
import roll5 from '../assets/roll/5.jpg'
import roll6 from '../assets/roll/6.jpg'

export default {
    props:['num'],
    data:function(){
        return{
            roll:{
                0:roll0,
                1:roll1,
                2:roll2,
                3:roll3,
                4:roll4,
                5:roll5,
                6:roll6
            }
        }
    },
    methods:{
    }
}
</script>