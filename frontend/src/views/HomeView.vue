<template>
  <div class="home">
    <h1 v-if="isAuthenticated">Bienvenue, {{ user.firstName }} {{ user.lastName }}</h1>
    <p v-if="isAuthenticated">Email : {{ user.email }}</p>
    <button v-if="isAuthenticated" @click="signout" class="btn">Se déconnecter</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomeView',
  data() {
    return {
      user: {},
      isAuthenticated: false
    };
  },
  async beforeCreate() {
    try {
      const response = await axios.get('http://localhost:3000/user', {withCredentials: true});
      this.user = response.data;
      this.isAuthenticated = true;
    } catch (error) {
      console.warn('Utilisateur non authentifié, redirection...');
      this.$router.push('/');
    }
  },
  methods: {
    async signout() {
      try {
        await axios.post('http://localhost:3000/signout', {}, {withCredentials: true});
        this.isAuthenticated = false;
        this.user = {};
        this.$router.push('/signin');
      } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
      }
    }
  }
};
</script>

<style scoped>
.home {
  max-width: 600px;
  margin: 50px auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

p {
  color: #555;
  margin-bottom: 20px;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}
</style>