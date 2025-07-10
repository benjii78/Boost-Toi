<template>
    <div>
      <div v-if="user">
        Connecté en tant que : <strong>{{ user.email }}</strong>
        <button @click="signOut">Déconnexion</button>
      </div>
      <div v-else>
        <input v-model="email" placeholder="Email">
        <input v-model="password" placeholder="Password" type="password">
        <button @click="signIn">Connexion</button>
        <button @click="signUp">Inscription</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { supabase } from '../api/supabase';
  
  const email = ref('');
  const password = ref('');
  const user = ref(null);
  
  async function getUser() {
    const { data } = await supabase.auth.getUser();
    user.value = data.user;
  }
  
  async function signIn() {
    const { error } = await supabase.auth.signInWithPassword({ email: email.value, password: password.value });
    if (error) alert(error.message);
    else await getUser();
  }
  
  async function signUp() {
    const { error } = await supabase.auth.signUp({ email: email.value, password: password.value });
    if (error) alert(error.message);
    else alert('Inscription réussie ! Vérifie ton email.');
  }
  
  async function signOut() {
    await supabase.auth.signOut();
    user.value = null;
  }
  
  onMounted(getUser);
  </script>
  