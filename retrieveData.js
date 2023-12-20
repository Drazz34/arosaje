const db = require('./database');

// Sélectionnez toutes les lignes de la table "utilisateur"
db.all('SELECT * FROM utilisateur', (err, rows) => {
    if (err) {
        console.error(err.message);
        return;
    }

    // Affichez les données récupérées
    rows.forEach((row) => {
        console.log(`ID: ${row.ID_Utilisateur}, Nom: ${row.Nom}, Prénom: ${row.Prenom}, Email: ${row.Email}, Localisation: ${row.Localisation}`);
    });
});
