<template>
    <div class="body">
        <h1 class="samy">Samy</h1>
        <div class="card">
            <h1>What's your name ?</h1>
            <input v-model="username" type="text" placeholder="Username">
            <button @click="createAccount()" :class="{'button--disabled' : !validatedFields}">
                <span v-if="status == 'loading'">Loading...</span>
                <span v-else>Lets go !</span>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'vuex';

export default defineComponent({
  name: 'WelcomeView',
  data: function() {
    return {
      username: '' 
    }
  },
  computed: {
      validatedFields: function () {
          if (this.username != '') {
              return true;
          } else {
              return false;
          }
      }, 
      ...mapState(['status'])
  },
  methods: {
      createAccount : function () {
          const self = this;
          console.log(this.username);
          this.$store.dispatch('createAccount', {
              username: this.username,
          }).then(function(response) {
              localStorage.setItem('token', response.data.token);
              self.$store.commit('setToken', response.data.token);
              console.log(self.$store.state);
              self.$router.push('/');
          }, function(error) {
              console.log(error);
          })
        },
  },
   mounted: function () {
    let isLogged = localStorage.getItem('token');
    if (!isLogged) {
    } else {
      console.log('Welcome page: Redirecting to "/"')
      this.$router.push('/');
    }
  },
});
</script>

<style scoped>
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
