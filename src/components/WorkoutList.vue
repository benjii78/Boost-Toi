<template>
  <div v-if="programme">
    <h2>{{ programme.title }}</h2>
    <ul>
      <li v-for="ex in programme.exercises" :key="ex.name">
        {{ ex.name }} - {{ ex.series }} séries, {{ ex.reps || ex.duration_seconds + ' sec' }}
      </li>
    </ul>
    <button @click="effectuerProgramme">Effectuer ce programme</button>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue';
import { supabase } from '../api/supabase';

const props = defineProps(['selected']);
const programme = ref(null);
const user = ref(null);

async function effectuerProgramme() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    alert('Veuillez vous connecter pour enregistrer ce suivi.');
    return;
  }

  const { error } = await supabase.from('progress').insert({
    user_id: user.id,
    workout_name: programme.value.title,
    exercises: programme.value.exercises
  });

  if (error) alert('Erreur : ' + error.message);
  else alert('Programme enregistré dans votre suivi!');
}

watch(() => props.selected, async (newVal) => {
  if (newVal) {
    programme.value = (await import(`../exercices/${newVal}.json`)).default;
  }
});
</script>
