<template>
  <div class="accountBanner">
    <table @click="pushAccount()">
      <tr>
        <td class="info">{{username}}, {{wins}}👑</td>
        <td class="settings"><div><font-awesome-icon icon="pen-to-square" size="2x" :style="{ color: '#2F2F2F' }"/></div></td>
      </tr>
    </table>
  </div>
  <div class="body">
    <h1 class="samy">Samy</h1>
    <div class="card">
      <input v-model="code" type="number" placeholder="Room code">
      <!-- <button :class="{'button--disabled' : !validatedFields}"><span>Join game 🎲</span></button> -->
      <button class="join"><span>Join game    <font-awesome-icon icon="paper-plane" size="lg" :style="{ color: '#fff'}"/></span></button>
      <div class="or"><span>or</span></div>
      <button class="create"><span>Create room    <font-awesome-icon icon="plus" size="lg" :style="{ color: '#fff'}"/></span></button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

export default defineComponent({
  name: 'HomeView',
  data: function() {
    return {
      code: '',
      username: '',
      wins: ''
    }
  },
  methods: {
    pushAccount : function () {
      this.$router.push('/account');
    },
  },
  mounted: function () {
    //redirecting to /welcome if there no token
    let isLogged = localStorage.getItem('token');
    if (!isLogged) {
      console.log('Homepage: Redirecting to /welcome');
      this.$router.push('/welcome');
    } else {
      console.log('Homepage: Already logged no redirecting');
    }
    //get user info for account banner
    this.$store.dispatch('getInfos')
    .then((response: any) => {
      this.username = response.data.username;
      this.wins = response.data.wins;
    });

  },
  computed: {
      validatedFields: function () {
          if (this.code != '') {
              return true;
          } else {
              return false;
          }
      }, 
      ...mapState(['status']),

  },
});
</script>

<style scoped>
.accountBanner {
  z-index: 9999;
  background-color: rgb(255, 255, 255, 1);
  border-radius: 20px;
  font-family: 'Lexend', sans-serif;
  width: 95vw;
  height: 15vw;
  margin: 0 auto;
  margin-top: 2.5vw !important;
  filter: drop-shadow(1px 2px 2px rgb(0, 0, 0, 0.4));
  cursor: pointer;
}

table {
  width: 100%;
  height: 100%;
}
.info {
  font-weight: 800;
  font-size: 30px;
  color: #2F2F2F;
  padding-left: 5vw;
}

.samy{
  color: #fff;
  font-family: 'Atma', cursive;
  font-size: 60px;
  text-align: center;
  padding-bottom: 2.5vw;
}

h1 {
  padding: 0;
  margin: 0;
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
.card h1 {
  font-weight: 800;
  font-size: 30px;
  text-align: center;
  color: #2F2F2F;
  padding-bottom: 5vw;
}
.card input {
  width: 100%;
  height: 7vh;
  font-family: 'Lexend', sans-serif;
  outline: none;
  border: 3px solid #C4C4C4;
  border-radius: 15px !important;
  box-sizing: border-box;
  font-weight: 600;
  font-size: 22px;
  color: #2F2F2F !important;
  text-align: center; 
  margin-bottom: 3vw;
}

.card input::placeholder {
  color: #C4C4C4;
  opacity: 1;
}

.join {
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
  margin-bottom: 1.5vw;
}

.create {
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
}

input{ 
  -webkit-appearance: none !important;
  -moz-appearance: none;
  padding: 0;
  margin: 0;
}

td {
  padding: 0;
  margin: 0;
}

.or {
  width: 100%;
  height: 6.5vh/2;
  font-family: 'Lexend', sans-serif;
  margin-bottom: 1.5vw;
  text-align: center;
  line-height: 6.5vh/2;
  font-weight: 800;
  font-size: 30px;
  color: #2F2F2F;
}
</style>
