const sqlite3 = require('sqlite3').verbose();

// Création d'une nouvelle instance de bdd
let db = new sqlite3.Database('./mydb.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connecté à la BDD SQLITE.');
});

// Création des tables

// Table Utilisateur
db.run(`CREATE TABLE IF NOT EXISTS utilisateur (
    ID_Utilisateur INTEGER PRIMARY KEY AUTOINCREMENT,
    Nom TEXT NOT NULL,
    Prenom TEXT NOT NULL,
    Email TEXT NOT NULL,
    Mot_de_passe TEXT NOT NULL,
    Localisation TEXT
  )`);

// Table Plante
db.run(`CREATE TABLE IF NOT EXISTS plante (
    ID_Plante INTEGER PRIMARY KEY AUTOINCREMENT,
    Nom TEXT NOT NULL,
    Type TEXT NOT NULL,
    Besoins_en_eau TEXT,
    Besoins_en_lumiere TEXT,
    ID_Proprietaire INTEGER,
    FOREIGN KEY (ID_Proprietaire) REFERENCES utilisateur (ID_Utilisateur)
  )`);

// Table Botaniste
db.run(`CREATE TABLE IF NOT EXISTS botaniste (
    ID_Botaniste INTEGER PRIMARY KEY AUTOINCREMENT,
    Nom TEXT NOT NULL,
    Prenom TEXT NOT NULL,
    Specialite TEXT NOT NULL,
    ID_Utilisateur INTEGER,
    FOREIGN KEY (ID_Utilisateur) REFERENCES utilisateur (ID_Utilisateur)
  )`);

// Table Garde
db.run(`CREATE TABLE IF NOT EXISTS garde (
    ID_Garde INTEGER PRIMARY KEY AUTOINCREMENT,
    Date_Debut TEXT NOT NULL,
    Date_Fin TEXT NOT NULL,
    ID_Plante INTEGER,
    ID_Gardien INTEGER,
    FOREIGN KEY (ID_Plante) REFERENCES plante (ID_Plante),
    FOREIGN KEY (ID_Gardien) REFERENCES utilisateur (ID_Utilisateur)
  )`);

// Table Conseil
db.run(`CREATE TABLE IF NOT EXISTS conseil (
    ID_Conseil INTEGER PRIMARY KEY AUTOINCREMENT,
    Contenu TEXT NOT NULL,
    Date TEXT NOT NULL,
    ID_Plante INTEGER,
    ID_Botaniste INTEGER,
    FOREIGN KEY (ID_Plante) REFERENCES plante (ID_Plante),
    FOREIGN KEY (ID_Botaniste) REFERENCES botaniste (ID_Botaniste)
  )`);

// Exportation de l'instance db
module.exports = db;