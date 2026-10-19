# Gestion du matériel — AdonisJS Lab

## Présentation

Application web de gestion et de réservation de matériel développée dans le cadre du projet AdonisJS Lab en BUT Métiers du Multimédia et de l'Internet (MMI).

L'objectif est de permettre de consulter les équipements disponibles, de gérer le matériel et d'enregistrer des réservations pour une période donnée.

## Fonctionnalités

### Gestion du matériel

- Affichage de la liste du matériel enregistré.
- Ajout d'un matériel avec son nom, sa catégorie, sa description et sa quantité.
- Modification des informations d'un matériel.
- Suppression d'un matériel.
- Validation des données côté serveur avec VineJS.
- Enregistrement des données dans une base SQLite.

### Réservation de matériel

- Consultation du matériel proposé à la réservation.
- Création d'une réservation avec le matériel choisi, le nom du demandeur et les dates de début et de fin.
- Enregistrement des réservations dans la base de données.
- Affichage des réservations enregistrées.
- Attribution du statut `pending` aux nouvelles réservations.
- Vérification que la date de fin n'est pas antérieure à la date de début.
- Protection des formulaires contre les requêtes CSRF.

**Amélioration prévue :** vérification des quantités disponibles en fonction des réservations existantes et des dates choisies.

## Technologies utilisées

- **AdonisJS** : framework backend.
- **TypeScript** : langage de programmation.
- **Lucid ORM** : interactions avec la base de données.
- **SQLite** : système de base de données.
- **Edge** : moteur de templates pour les vues.
- **VineJS** : validation des données.
- **Luxon** : manipulation des dates.
- **Git et GitHub** : gestion des versions et hébergement du code.

## Installation et lancement

### Prérequis

- Node.js
- npm

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

Configurer les variables d'environnement nécessaires dans un fichier `.env` local, conformément à la configuration du projet.

Ne pas publier le fichier `.env` sur GitHub, car il peut contenir des informations sensibles.

### 4. Exécuter les migrations

```bash
node ace migration:run
```

### 5. Lancer le serveur de développement

```bash
npm run dev
```

L'application est accessible à l'adresse suivante :

http://localhost:3333

### Pages principales

- Gestion du matériel : http://localhost:3333/materials
- Réservation de matériel : http://localhost:3333/reservations

## État du projet

Le projet est en cours de développement.

La gestion du matériel (ajout, affichage, modification et suppression) est fonctionnelle. La création et l'affichage des réservations sont également opérationnels.

La vérification complète de la disponibilité du matériel selon les dates et les quantités restantes reste à implémenter.

## Utilisation de l'intelligence artificielle

L'intelligence artificielle a été utilisée comme outil d'accompagnement pour comprendre le fonctionnement d'AdonisJS, structurer le code, résoudre certaines erreurs et développer les fonctionnalités de l'application.

Les propositions obtenues ont été testées et adaptées au projet au fur et à mesure du développement.