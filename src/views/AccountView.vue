<template>
    <div class="banner" @click="pushHome()">
        <h1>Return to menu   <font-awesome-icon icon="house" size="1x" :style="{ color: '#2F2F2F' }"/></h1>
    </div>
    <div class="body">
    <div class="card">
      <div class="username"><span>{{username}}</span></div>
      <div class="rate"><span>{{wins}}👑  {{losses}}⚰️</span></div>
      <input v-model="newUsername" type="text" placeholder="Rename">
      <button class="submit" @click="rename()">
        <font-awesome-icon icon="paper-plane" size="lg" :style="{ color: '#fff'}"/><span v-if="status == 'loading'">    Loading...</span>
        <span v-else>    Submit</span>
      </button>
      <div class="or"><span>or</span></div>
      <button class="delete" @click="pushDelete()">
        <span><font-awesome-icon icon="trash-can" size="lg" :style="{ color: '#fff'}"/>   Delete account (definitive)</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

export default defineComponent({
  name: 'AccountView',
  data: function() {
    return {
        newUsername: '',
        username: '',
        id: '',
        wins: '',
        losses: '',
        date: '',
    }
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
    //get user info
    this.$store.dispatch('getInfos')
    .then((response: any) => {
      this.username = response.data.username;
      this.id = response.data._id;
      this.wins = response.data.wins;
      this.losses = response.data.losses;
      this.date = response.data.date;
    });
  },
  methods: {
    pushHome : function () {
      this.$router.push('/');
    },
    rename: function () {
      const self = this;
      const newUSERNAME = this.newUsername[0].toUpperCase() + this.newUsername.substr(1).toLowerCase();
      console.log(newUSERNAME);
      this.$store.dispatch('renameAccount', {
              username: newUSERNAME,
          }).then(function(response) {
              self.$store.commit('setUsername', newUSERNAME);
              console.log(response);
              console.log(self.$store.state);
          }, function(error) {
              console.log(error);
          })
    },
    pushDelete: function () {
      this.$router.push('/delete');
    }
  },
  computed: {
    ...mapState(['status'])
  },
});

</script>

<style scoped>
.banner {
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

.banner h1 {
    font-weight: 800;
    font-size: 30px;
    color: #2F2F2F;
    justify-content: center;
    line-height: 15vw;
    text-align: center;
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
.card h1 {
  font-weight: 800;
  font-size: 30px;
  text-align: center;
  color: #2F2F2F;
  padding-bottom: 1.5vw;
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

.submit {
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
.delete {
  width: 100%;
  height: 6.5vh;
  font-family: 'Lexend', sans-serif;
  background-color:#d4264c;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 15px !important;
  font-weight: 600;
  filter: drop-shadow(0px 5px 0px rgb(207, 0, 45, 1));
  transition: all 0.5s ease;
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

.username {
  width: 100%;
  height: 6.5vh/2;
  font-family: 'Lexend', sans-serif;
  margin-bottom: 1.5vw;
  text-align: center;
  line-height: 6.5vh/2;
  font-weight: 800;
  font-size: 40px;
  color: #2F2F2F;
}

.rate {
  width: 100%;
  height: 6.5vh/2;
  font-family: 'Lexend', sans-serif;
  margin-bottom: 6vw;
  text-align: center;
  line-height: 6.5vh/2;
  font-weight: 800;
  font-size: 28px;
  color: #2F2F2F;
}

input{ 
  -webkit-appearance: none !important;
  -moz-appearance: none;
  padding: 0;
  margin: 0;
}
</style>


