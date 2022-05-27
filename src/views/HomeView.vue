<template>
  <div class="accountBanner">
    <h1>Mathis 3👑</h1>
  </div>
  <div class="body">
    <h1 class="samy">Samy</h1>
    <div class="card">
      <input v-model="code" type="number" placeholder="Room code">
      <button :class="{'button--disabled' : !validatedFields}">
        <span>Play 🎲</span>
      </button>
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
      code: '' 
    }
  },
  mounted: function () {
    let isLogged = localStorage.getItem('token');
    if (!isLogged) {
      console.log('Homepage: Redirecting to /welcome');
      this.$router.push('/welcome');
    } else {
      console.log('Homepage: Already logged no redirecting');
    }
  },
  computed: {
      validatedFields: function () {
          if (this.code != '') {
              return true;
          } else {
              return false;
          }
      }, 
      ...mapState(['status'])
  },
});
</script>

<style scoped>
.accountBanner {
  z-index: 9999;
  background-color: rgb(255, 255, 255, 0.8);
  border-radius: 20px;
  font-family: 'Lexend', sans-serif;
  width: 95vw;
  height: 15vw;
  margin: 0 auto;
  margin-top: 2.5vw !important;
  filter: drop-shadow(1px 2px 2px rgb(0, 0, 0, 0.4));
}

.accountBanner h1 {
  font-weight: 800;
  font-size: 30px;
  color: #2F2F2F;
  margin: 0;
  padding: 0;
  color: white;
  vertical-align: middle;
  line-height: 15vw;
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
  width: 80vw;
}
.card{
  background-color: #fff;
  padding: 5vw;
  border-radius: 10px;
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
  height: 50px;
  font-family: 'Lexend', sans-serif;
  outline: none;
  border: 2px solid #C4C4C4;
  border-radius: 5px !important;
  box-sizing: border-box;
  font-weight: 600;
  font-size: 18px;
  color: #2F2F2F !important;
  text-align: center; 
  margin-bottom: 5vw;
}

.card input::placeholder {
  color: #C4C4C4;
  opacity: 1;
}

.card button {
  width: 100%;
  height: 50px;
  font-family: 'Lexend', sans-serif;
  background-color:#1473E6;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 5px !important;
  font-weight: 600;
  filter: drop-shadow(0px 5px 0px rgb(0, 99, 220, 1));
}

input{ 
  -webkit-appearance: none !important;
  -moz-appearance: none;
  padding: 0;
  margin: 0;
}
</style>
