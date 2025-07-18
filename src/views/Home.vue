<template>
    <Login />
    <WorkoutButtons @select="current = $event"/>
    <WorkoutList :selected="current"/>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Login from '../components/Login.vue';
  import WorkoutButtons from '../components/WorkoutButtons.vue';
  import WorkoutList from '../components/WorkoutList.vue';
  
  const current = ref(null);
  </script>
  