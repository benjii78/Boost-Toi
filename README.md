#  Boost-Toi

**Boost-Toi** est une application fullstack de développement personnel permettant aux utilisateurs de suivre leurs objectifs, routines et évolutions. Ce projet est réalisé dans le cadre d’un module de modélisation UML et développement fullstack.

---

## Git Workflow du projet

Nous utilisons une organisation en branches basée sur **Git Flow** :

### 🔗 Branches principales
- `main` : branche **de production** stable
- `staging` : **préproduction** pour tests globaux
- `dev` : intégration des fonctionnalités terminées

###  Branches éphémères (créées à partir de `dev`)
| Préfixe       | Usage                                           | Exemple                       |
|---------------|--------------------------------------------------|-------------------------------|
| `feat/front-` | Composants Vue.js (`.vue`)                      | `feat/front-dashboard`        |
| `feat/api-`   | API côté Node.js/Express                        | `feat/api-objectifs`          |
| `style/`      | Fichiers `.css` ou style dans `.vue`           | `style/formulaire-objectif`   |
| `fix/`        | Correction de bugs                              | `fix/bug-login`               |
| `data/`       | Manipulation de fichiers `.json` (mock/config) | `data/mock-users`             |
| `config/`     | Configuration (routes, libs, init)              | `config/vue-router`           |

###  Exemples de commandes Git

```bash
# Création d'une branche feature
git checkout dev
git checkout -b feat/api-auth

# Travailler sur le code (ex: routes/auth.js, Login.vue, style.css, data/users.json)

# Enregistrer les modifications
git add .
git commit -m "feat(api): ajout du login utilisateur"
git push origin feat/api-auth
