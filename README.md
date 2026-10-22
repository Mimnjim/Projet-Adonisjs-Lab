# Gestion du matériel — AdonisJS Lab

## Présentation

Application web de gestion et de réservation de matériel développée dans le cadre du projet AdonisJS Lab en troisième année de BUT Métiers du Multimédia et de l'Internet (MMI).

L'objectif est de permettre de gérer un inventaire de matériel, de consulter les équipements disponibles et d'enregistrer des réservations sur une période donnée.

## Fonctionnalités

### Gestion du matériel

- Affichage de la liste du matériel enregistré.
- Ajout d'un matériel avec son nom, sa catégorie, sa description et sa quantité.
- Modification des informations d'un matériel.
- Suppression d'un matériel.
- Validation des données côté serveur avec VineJS.
- Enregistrement des données dans une base SQLite.
- Protection contre la suppression d'un matériel possédant des réservations actives.

### Réservation de matériel

- Affichage des réservations enregistrées et du matériel associé.
- Création d'une réservation avec le matériel choisi, le nom du demandeur, les dates de début et de fin et la quantité souhaitée.
- Vérification de la validité des dates.
- Calcul de la quantité disponible en fonction du matériel, de la période sélectionnée et des réservations existantes.
- Prise en compte des chevauchements de dates et exclusion des réservations annulées dans le calcul de disponibilité.
- Affichage dynamique de la quantité disponible.
- Désactivation du bouton de réservation lorsqu'aucun exemplaire n'est disponible.
- Vérification de la disponibilité côté serveur avant l'enregistrement.
- Attribution du statut `pending` aux nouvelles réservations.
- Annulation des réservations et mise à jour de leur statut.
- Messages de confirmation et d'erreur pour informer l'utilisateur.
- Protection des formulaires contre les requêtes CSRF.

## Technologies utilisées

- **AdonisJS** : framework web utilisé pour la partie serveur.
- **TypeScript** : langage de programmation utilisé pour développer l'application.
- **Lucid ORM** : gestion des interactions avec la base de données.
- **SQLite** : système de base de données.
- **Edge** : moteur de templates pour générer les pages HTML.
- **VineJS** : validation des données reçues depuis les formulaires.
- **Luxon** : manipulation des dates.
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

Si aucune clé d'application n'est configurée, en générer une avec la commande suivante :

```bash
node ace generate:key
```

Reporter la clé obtenue dans la variable `APP_KEY` du fichier `.env`.

Le fichier `.env` ne doit pas être publié sur GitHub, car il peut contenir des informations sensibles.

### 4. Exécuter les migrations

```bash
node ace migration:run
```

Cette commande crée les tables nécessaires dans la base de données selon les migrations du projet.

### 5. Lancer le serveur de développement

```bash
npm run dev
```

L'application est accessible à l'adresse suivante :

http://localhost:3333

## Pages principales

- **Accueil** : http://localhost:3333/
- **Gestion du matériel** : http://localhost:3333/materials
- **Réservations** : http://localhost:3333/reservations

## Difficultés rencontrées

### Installation des dépendances

L'installation du projet et de certaines dépendances npm a rencontré des erreurs liées à l'environnement de développement et à la compilation de dépendances natives. Il a fallu installer les outils de compilation nécessaires et adapter la configuration de `node-gyp` pour terminer l'installation.

### Protection CSRF des formulaires

Lors de la mise en place du formulaire d'ajout de matériel, les requêtes étaient rejetées en raison de l'absence du jeton CSRF attendu. L'ajout de `csrfField()` dans les formulaires Edge a permis de résoudre ce problème et de comprendre le rôle de cette protection.

### Gestion des dates et des types

Lors de l'enregistrement des réservations, des erreurs TypeScript sont apparues car les dates reçues et validées ne correspondaient pas directement aux types attendus par le modèle. Le travail sur cette erreur a permis de mieux comprendre les conversions de dates et le rôle de Luxon, VineJS et Lucid.

### Calcul de la disponibilité

Le calcul du stock disponible nécessitait de prendre en compte les périodes des réservations existantes. Une simple soustraction de toutes les réservations aurait donné un résultat incorrect. Il a donc fallu tenir compte des chevauchements de dates et exclure les réservations annulées pour calculer la disponibilité sur la période choisie.

## Utilisation de l'intelligence artificielle

ChatGPT a été utilisé comme outil d'accompagnement pendant le développement pour comprendre le fonctionnement d'AdonisJS, structurer le code, mettre en place les fonctionnalités et résoudre les erreurs rencontrées.

### Avantages

- Obtenir des explications sur les différents composants du framework.
- Avancer étape par étape dans la réalisation des fonctionnalités.
- Comprendre les messages d'erreur et explorer des solutions.
- Découvrir les interactions entre les routes, les contrôleurs, les modèles, les validateurs, les vues et la base de données.

### Difficultés et limites

Les solutions proposées par l'intelligence artificielle ne pouvaient pas toujours être utilisées directement. Certaines nécessitaient des adaptations ou des vérifications pour correspondre à la structure du projet et aux types attendus par AdonisJS.

Il était donc nécessaire de tester les modifications, de lire les erreurs obtenues et de comprendre les solutions avant de poursuivre le développement.

### Ce que j'ai appris

Ce projet m'a permis de mieux comprendre la structure d'une application web avec AdonisJS, l'utilisation de Lucid ORM et de VineJS, la gestion des données avec SQLite et le traitement des réservations selon les périodes demandées.

Il m'a également appris à utiliser l'intelligence artificielle comme un outil d'aide au développement, tout en vérifiant et en adaptant les solutions proposées.

## État du projet

Les principales fonctionnalités de gestion du matériel et de réservation sont implémentées.

L'application permet de gérer le matériel, de créer et d'annuler des réservations et de vérifier la disponibilité des équipements selon les dates et les quantités demandées.

Le projet a été développé dans le cadre de l'atelier AdonisJS Lab en BUT MMI.