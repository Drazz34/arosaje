const db = require('./database');

// Insertion de données dans la table "utilisateur"
db.run(`INSERT INTO utilisateur (Nom, Prenom, Email, Mot_de_passe, Localisation)
VALUES ('Duff', 'John', 'john.duff@gmail.com', 'Coincoin123+', 'Coincoinville');`, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Données insérées avec succès.');
    }
});