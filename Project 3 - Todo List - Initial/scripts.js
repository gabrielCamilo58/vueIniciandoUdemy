const listaTarefa = {
    data(){
        return{
            list:[{active : false}],
            add:{},
        }
    },  
    methods: {
        addList(){
            if(this.add.item){
                this.list.push(this.add);
                this.add = {};
            }
        },
        cleanList(){
            this.list = []
        },
        clickRisc(){
            
        }
    },
}
Vue.createApp(listaTarefa).mount('#app');