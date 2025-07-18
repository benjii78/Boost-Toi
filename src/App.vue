<template>
  <div class="app-container">
    <nav class="navbar">
      <RouterLink to="/">🏠 Accueil</RouterLink>
      <RouterLink to="/suivi">📊 Suivi</RouterLink>
    </nav>

    <router-view />
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  gap: 30px;
  background: #1f2937;
  padding: 16px;
  font-weight: bold;
  border-radius: 10px;
  margin-bottom: 20px;
}

a {
  color: white;
  text-decoration: none;
}

a.router-link-exact-active {
  text-decoration: underline;
}

.app-container {
  max-width: 900px;
  margin: 0 auto;
}
</style>
