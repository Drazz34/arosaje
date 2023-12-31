const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Utilisez bodyParser pour gérer les données du formulaire
app.use(bodyParser.urlencoded({ extended: false }));

// Créez une nouvelle instance de la base de données SQLite
const db = new sqlite3.Database('./mydb.sqlite');

// Utilisez EJS comme moteur de modèle
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Route de la page d'accueil
app.get('', (req, res) => {
  res.render('accueil');
});

// Route pour afficher les données
app.get('/donnees', (req, res) => {
  // Créez une nouvelle instance de la base de données SQLite
  const db = new sqlite3.Database('./mydb.sqlite');

  // Exécutez une requête SELECT pour récupérer les données de la base de données
  db.all('SELECT * FROM utilisateur', (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Erreur lors de la récupération des données.');
    }

    // Fermez la connexion à la base de données
    db.close();

    // Rendez les données dans une vue utilisant EJS
    res.render('tableau', { donnees: rows });
  });
});

// Route pour insérer un nouvel utilisateur
app.post('/ajouter-utilisateur', (req, res) => {
  // Récupérez les données du formulaire depuis req.body
  const { nom, prenom, email, password, ville } = req.body;

  // Insérez ces données dans la base de données SQLite
  db.run(
    'INSERT INTO utilisateur (Nom, Prenom, Email, Mot_de_passe, Localisation) VALUES (?, ?, ?, ?, ?)',
    [nom, prenom, email, password, ville],
    (err) => {
      if (err) {
        console.error(err.message);
        // Gérez les erreurs ici, par exemple, renvoyez une page d'erreur.
        res.send('Erreur lors de l\'insertion de l\'utilisateur.');
      } else {
        // Redirigez l'utilisateur vers la page d'accueil ou une page de confirmation.
        res.redirect('/');
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
