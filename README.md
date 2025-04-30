
# Mini-projet 1 : Authentification avec Passport-Local et Session

## Auteurs
- **Floryan BORNET**
- **Corentin BRENDLE**

---

## Description du projet
Ce projet est le premier des trois mini-projets visant à explorer différentes stratégies d'authentification et de gestion des sessions. Il implémente une authentification basée sur `Passport-Local` avec une gestion des sessions via cookies.

### Fonctionnalités principales
- Inscription des utilisateurs.
- Connexion avec vérification des identifiants.
- Page d'accueil sécurisée après connexion.
- Stockage des sessions dans des cookies.

---

## Organisation du projet
Le projet est organisé en deux parties :
- **Backend** : Contient le code serveur (API REST, gestion des sessions, etc.).
- **Frontend** : Contient l'interface utilisateur développée avec Vue.js.

### Structure des dossiers
```
Authentification-avec-Passport-Local-et-Session/
├── backend/
│   ├── config/       # Configuration de la base de données et Passport.js
│   ├── controllers/  # Logique métier (inscription, connexion, etc.)
│   ├── models/       # Modèles Sequelize
│   ├── routes/       # Routes API
│   ├── app.js        # Point d'entrée du serveur
│   └── package.json  # Dépendances backend
├── frontend/
│   ├── src/
│   │   ├── components/  # Composants Vue.js
│   │   ├── views/       # Pages Vue.js
│   │   ├── router/      # Configuration des routes
│   │   ├── store/       # Gestion de l'état global
│   │   └── main.js      # Point d'entrée du frontend
│   └── package.json     # Dépendances frontend
└── README.md
```

---

## Instructions pour exécuter le projet

### Prérequis
- **Node.js** (v14 ou supérieur)
- **npm** ou **yarn**
- **PostgreSQL** (ou MySQL)
- 
### Configuration du fichier `.env`

Créez un fichier `.env` dans le dossier `backend/` avec les variables suivantes :

```env
# Configuration de la base de données
DB_USERNAME=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_DATABASE=your_development_database
DB_DATABASE_TEST=your_test_database
DB_DATABASE_PROD=your_production_database
DB_HOST=localhost
DB_PORT=5432

# Environnement de l'application
NODE_ENV=development

# Clé secrète pour les sessions
SECRET=your_secret_key
```


### Étapes
1. **Cloner le dépôt GitHub** :
   ```bash
   git clone https://github.com/BornetFloryan/Authentification-avec-Passport-Local-et-Session.git
   cd Authentification-avec-Passport-Local-et-Session
   ```

2. **Configurer le backend** :
   - Accédez au dossier `backend` :
     ```bash
     cd backend
     ```
   - Installez les dépendances :
     ```bash
     npm install
     ```
   - Configurez la base de données dans `config/config.json`.
   - Lancez le serveur :
     ```bash
     npm start
     ```

3. **Configurer le frontend** :
   - Accédez au dossier `frontend` :
     ```bash
     cd ../frontend
     ```
   - Installez les dépendances :
     ```bash
     npm install
     ```
   - Lancez le serveur de développement :
     ```bash
     npm run serve
     ```

4. **Accéder à l'application** :
   - Ouvrez votre navigateur et accédez à `http://localhost:8080`.
