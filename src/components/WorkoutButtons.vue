<template>
    <div>
      <button v-for="p in programmes" :key="p" @click="$emit('select', p)">
        {{ p }}
      </button>
    </div>
  </template>
  
  <script setup>
  const programmes = ["full_body", "bas_du_corps", "cardio_intense", "gainage_abdos", "haut_du_corps"];
  </script>
  