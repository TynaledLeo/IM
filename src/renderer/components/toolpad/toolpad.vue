<template>

      <div id="toolset">
            <button id="exit" @click="quit()">QUIT</button>
            <button id="max" @click="min()">MIN</button>
            <button id="max" @click="max()">{{this.ismax}}</button>
      </div>

</template>

<script>
import { remote } from 'electron';
export default {
    name: 'toolpad',  
    data(){
        return{
            ismax:'MAX',
        }
    },
    methods:{
        quit(){
            if (this.$parent.disconnect) {
                this.$parent.disconnect()
            }
            remote.getCurrentWindow().close();
        },
        max(){
            // remote.getCurrentWindow().close();
            if(this.ismax==='MAX'){
                this.ismax = 'RESTORE'
                remote.getCurrentWindow().maximize();
            }else{
                remote.getCurrentWindow().setPosition(360,140);
                this.ismax = 'MAX'
                remote.getCurrentWindow().setContentSize(1200,800);
            }
        },
        min(){
            remote.getCurrentWindow().minimize();
        }
    }
    }
</script>

<style scoped>
*{margin:0px;
  padding:0px;
 }

#exit{
    margin: 5px;
    width: 15%;
    height: 5vh;
    background-color: #f30000;
    border: gray;
    font-size: 19px;
    border-radius: 3px;
    color: white;
}
#max{
    margin: 5px;
    width: 15%;
    height: 5vh;
    background-color: #00b7ff;
    border: gray;
    font-size: 19px;
    border-radius: 3px;
    color: white;
}
#toolset{
    display: flex;
    flex-direction: row-reverse;
    width: 50%;
    position: absolute;
    bottom: 40px;
    right: 30px;
}
</style>    