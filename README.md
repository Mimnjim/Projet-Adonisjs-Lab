# Gestion du matériel — AdonisJS Lab

## Présentation

Application web de gestion et de réservation de matériel développée dans le cadre du projet AdonisJS Lab en BUT Métiers du Multimédia et de l'Internet (MMI).

L'objectif est de permettre de gérer un inventaire de matériel et d'enregistrer des réservations sur une période donnée, tout en vérifiant la disponibilité des équipements.

## Fonctionnalités

### Gestion du matériel

- Affichage de la liste du matériel enregistré.
- Ajout d'un matériel avec son nom, sa catégorie, sa description et sa quantité.
- Modification des informations d'un matériel.
- Suppression d'un matériel.
- Validation des données côté serveur avec VineJS.
- Enregistrement des données dans une base de données SQLite.
- Protection contre la suppression d'un matériel possédant des réservations actives.

### Réservation de matériel

- Affichage des réservations enregistrées et du matériel associé.
- Création d'une réservation avec le matériel choisi, le nom du demandeur, les dates de début et de fin et la quantité souhaitée.
- Vérification de la validité des dates.
- Vérification de la quantité disponible en fonction du matériel et de la période sélectionnée.
- Affichage de la quantité disponible pour la période choisie.
- Désactivation du bouton de réservation lorsqu'aucun exemplaire n'est disponible.
- Vérification de la disponibilité côté serveur avant l'enregistrement de la réservation.
- Attribution du statut `pending` aux nouvelles réservations.
- Annulation d'une réservation, avec mise à jour de son statut.
- Messages de confirmation et d'erreur pour informer l'utilisateur.
- Protection des formulaires contre les requêtes CSRF.

## Technologies utilisées

- **AdonisJS** : framework web pour la partie serveur.
- **TypeScript** : langage utilisé pour développer l'application.
- **Lucid ORM** : gestion des interactions avec la base de données.
- **SQLite** : système de base de données.
- **Edge** : moteur de templates pour générer les pages HTML.
- **VineJS** : validation des données envoyées par les formulaires.
- **Luxon** : manipulation et validation des dates.
- **JavaScript** : mise à jour dynamique de la disponibilité côté client.
- **Git et GitHub** : gestion des versions et hébergement du code source.

## Installation et lancement

### Prérequis

- Node.js
- npm
- Git

### 1. Cloner le dépôt

```bash
git clone https://github.com/Mimnjim/Projet-Adonisjs-Lab.git
cd Projet-Adonisjs-Lab
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer l'environnement

Créer ou compléter le fichier `.env` local avec les variables nécessaires au fonctionnement d'AdonisJS.

Ne pas publier ce fichier sur GitHub, car il peut contenir des informations sensibles, notamment la clé de l'application.

Si nécessaire, générer une clé d'application avec :

```bash
node ace generate:key
```

Reporter la clé générée dans la variable `APP_KEY` du fichier `.env`.

### 4. Exécuter les migrations

```bash
node ace migration:run
```

Cette commande crée les tables nécessaires dans la base de données selon les migrations du projet.

### 5. Lancer le serveur de développement

```bash
npm run dev
```

L'application est ensuite accessible à l'adresse suivante :

http://localhost:3333

## Pages principales

- **Accueil** : http://localhost:3333/
- **Gestion du matériel** : http://localhost:3333/materials
- **Réservations** : http://localhost:3333/reservations

## État du projet

Les principales fonctionnalités de gestion du matériel et de réservation sont implémentées.

L'application permet de gérer le matériel, de créer et d'annuler des réservations et de vérifier les quantités disponibles sur une période donnée.

La disponibilité est vérifiée côté client pour améliorer l'expérience utilisateur, mais également côté serveur afin de contrôler les données avant l'enregistrement.

## Utilisation de l'intelligence artificielle

L'intelligence artificielle a été utilisée comme outil d'accompagnement pour comprendre le fonctionnement d'AdonisJS, découvrir les différents composants du framework, structurer le code et résoudre certaines erreurs.

Les suggestions ont été étudiées, testées et adaptées au projet au fur et à mesure du développement.