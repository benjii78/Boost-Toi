<template>
  <div class="progress-container">
    <div class="toolbar">
      <label for="date">📅 Filtrer par date :</label>
      <input id="date" type="date" v-model="filtreDate" />
      <button @click="toggleChart">
        {{ afficherGraphique ? "Masquer" : "Afficher" }} le graphique
      </button>
      <button @click="telechargerPDF">📄 Télécharger en PDF</button>
    </div>

    <div v-if="afficherGraphique" class="chart-wrapper">
      <canvas ref="chartRef"></canvas>
    </div>

    <div ref="pdfSection">
      <div class="totaux">
        <strong>🧮 Total séries effectuées :</strong> {{ totalSeries }}
      </div>

      <ul class="progress-list">
        <li v-for="p in filteredProgresses" :key="p.id">
          <strong>{{ p.workout_name }}</strong> — {{ new Date(p.created_at).toLocaleDateString() }}
          <ul>
            <li v-for="ex in p.exercises" :key="ex.name">
              {{ ex.name }} : {{ ex.series }} séries de {{ ex.reps || ex.duration_seconds + ' sec' }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { supabase } from '../api/supabase';
import Chart from 'chart.js/auto';
import html2pdf from 'html2pdf.js';

const progresses = ref([]);
const chartRef = ref(null);
const chartInstance = ref(null);
const afficherGraphique = ref(false);
const filtreDate = ref(null);
const pdfSection = ref(null);

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data, error } = await supabase
      .from('progress')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (!error) progresses.value = data;
  }
});

const filteredProgresses = computed(() => {
  if (!filtreDate.value) return progresses.value;
  return progresses.value.filter(p =>
    new Date(p.created_at).toDateString() === new Date(filtreDate.value).toDateString()
  );
});

const totalSeries = computed(() => {
  return filteredProgresses.value.reduce((total, prog) => {
    return total + prog.exercises.reduce((sum, ex) => sum + (ex.series || 0), 0);
  }, 0);
});

function toggleChart() {
  afficherGraphique.value = !afficherGraphique.value;
  if (afficherGraphique.value) {
    setTimeout(renderChart, 100); // attendre DOM
  } else {
    if (chartInstance.value) {
      chartInstance.value.destroy();
      chartInstance.value = null;
    }
  }
}

function renderChart() {
  const counts = filteredProgresses.value.reduce((acc, entry) => {
    acc[entry.workout_name] = (acc[entry.workout_name] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(counts);
  const values = Object.values(counts);

  if (chartInstance.value) chartInstance.value.destroy();

  const ctx = chartRef.value.getContext('2d');
  chartInstance.value = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Nombre de fois effectué',
        data: values,
        backgroundColor: '#3b82f6'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function telechargerPDF() {
  const element = pdfSection.value;
  html2pdf()
    .set({
      margin: 0.5,
      filename: 'mon_suivi.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    })
    .from(element)
    .save();
}
</script>

<style scoped>
.progress-container {
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.toolbar {
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.chart-wrapper {
  max-width: 100%;
  margin: 20px auto;
}

canvas {
  max-width: 100%;
}

.totaux {
  margin: 20px 0;
  font-size: 18px;
  color: #2563eb;
}

.progress-list {
  list-style: none;
  padding: 0;
  text-align: left;
  margin-top: 20px;
}

.progress-list li {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
</style>
