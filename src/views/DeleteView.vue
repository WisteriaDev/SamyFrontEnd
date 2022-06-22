<template>
    <div class="redBg">
        <div class="body">
            <div class="card">
                <div class="sentence"><span>Are you sure ?</span></div>
                <button class="yes" @click="deleteAccount()"><span>Yes    <font-awesome-icon icon="check" size="lg" :style="{ color: '#fff'}"/></span></button>
                <button class="no" @click="pushAccount()"><span>No    <font-awesome-icon icon="xmark" size="lg" :style="{ color: '#fff'}"/></span></button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
export default defineComponent({
    name: 'AccountView',

    mounted: function () {
        //redirecting to /welcome if there no token
        let isLogged = localStorage.getItem('token');
        if (!isLogged) {
            console.log('Homepage: Redirecting to /welcome');
            this.$router.push('/welcome');
        } 
        else {
            console.log('Homepage: Already logged no redirecting');
        }    
    },
    methods: {
        pushAccount : function () {
            this.$router.push('/account');
        },
        deleteAccount : function () {
            const self = this;
            this.$store.dispatch('deleteAccount')
            .then(function(response) {
              console.log(response);
              console.log(self.$store.state);
              localStorage.removeItem('token');
              self.$router.push('/');
          }, function(error) {
              console.log(error);
          })
        },
    }
})

</script>

<style scoped>
.redBg {
    background-color: #d4264c !important;
    width: 100vw;
    height: 100vh;
}
.body{ 
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
}
.card{
  background-color: #fff;
  padding: 5vw;
  border-radius: 20px;
  filter: drop-shadow(4px 4px 4px rgb(0, 0, 0, 0.5));
  font-family: 'Lexend', sans-serif;
}

h1 {
  padding: 0;
  margin: 0;
}
.sentence {
  width: 100%;
  height: 6.5vh/2;
  font-family: 'Lexend', sans-serif;
  margin-bottom: 4vw;
  text-align: center;
  line-height: 6.5vh/2;
  font-weight: 800;
  font-size: 40px;
  color: #2F2F2F;
}

.yes {
  width: 100%;
  height: 6.5vh;
  font-family: 'Lexend', sans-serif;
  background-color:#00BC50;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 15px !important;
  font-weight: 600;
  filter: drop-shadow(0px 5px 0px rgb(0, 163, 69, 1));
  transition: all 0.5s ease;
  margin-bottom: 4vw;
}


.no {
  width: 100%;
  height: 6.5vh;
  font-family: 'Lexend', sans-serif;
  background-color:#1473E6;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 15px !important;
  font-weight: 600;
  filter: drop-shadow(0px 5px 0px rgb(0, 99, 220, 1));
  transition: all 0.5s ease;
}
</style>