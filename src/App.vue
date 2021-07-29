<template>
  <div id="app">
    <div id="nav">
      <div class="" v-if="isLoggedIn">
        <router-link to="/dashboard">Dashboard</router-link>|
        <router-link to="/map">Google Maps</router-link>|
        <router-link class="me-2" to="/chat">Chat</router-link>|
      </div>
      <div class="" v-else>
        <router-link to="/">Home</router-link> |
        <router-link to="/register">Register</router-link>
      </div>
      <Button @click="logout" v-if="isLoggedIn">Logout</Button>
    </div>
    <router-view :isLoggedIn="isLoggedIn" @authCheck="authCheck" />
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      isLoggedIn: false,
      auth: localStorage.getItem("email"),
    };
  },
  mounted() {
    if (this.auth !== null) {
      console.log("email", this.auth)
      this.isLoggedIn = true;
    }
  },
  methods: {
    authCheck(val) {
      this.isLoggedIn = val;
      console.log("auth", this.isLoggedIn);
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Successfully logged out");
          this.isLoggedIn = false;
          localStorage.removeItem('email');
          this.$router.push("/").catch(() => {});
        })
        .catch((error) => {
          alert(error.message);
          this.$router.push("/").catch(() => {});
        });
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
