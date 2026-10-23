# Gestion du matériel — AdonisJS Lab

## Présentation

Ce projet a été réalisé dans le cadre du cours de développement back-end avancé en troisième année de BUT MMI.

L'idée était de créer une application web permettant de gérer du matériel et de suivre les réservations. On peut ajouter des équipements, modifier leurs informations, consulter les réservations et vérifier si le matériel est disponible pour les dates souhaitées.

Ce projet m'a permis de découvrir plus concrètement le fonctionnement d'AdonisJS et de mettre en pratique les notions vues en cours.

## Fonctionnalités

### Gestion du matériel

- Afficher la liste du matériel enregistré.
- Ajouter un matériel avec son nom, sa catégorie, sa description et sa quantité.
- Modifier les informations d'un matériel.
- Supprimer un matériel, sauf s'il possède encore des réservations actives.
- Vérifier les données saisies avant de les enregistrer.
- Stocker les informations dans une base de données SQLite.

### Réservation de matériel

- Consulter les réservations et le matériel associé.
- Réserver un matériel en indiquant le nom du demandeur, les dates et la quantité souhaitée.
- Vérifier que les dates de début et de fin sont cohérentes.
- Calculer la quantité disponible pour la période choisie.
- Prendre en compte les réservations qui se chevauchent dans le temps.
- Ne pas compter les réservations annulées dans le calcul de disponibilité.
- Afficher la disponibilité directement dans le formulaire.
- Désactiver le bouton de réservation lorsqu'il n'y a plus de stock disponible.
- Vérifier une nouvelle fois la disponibilité côté serveur avant d'enregistrer la réservation.
- Créer les réservations avec le statut `pending` et permettre leur annulation.
- Afficher des messages pour informer l'utilisateur lorsque son action a réussi ou rencontré une erreur.
- Protéger les formulaires contre les requêtes CSRF.

## Technologies utilisées

- **AdonisJS** : le framework utilisé pour construire l'application.
- **TypeScript** : utilisé pour écrire le code côté serveur.
- **Lucid ORM** : permet de communiquer avec la base de données à travers des modèles.
- **SQLite** : la base de données utilisée pour stocker le matériel et les réservations.
- **Edge** : utilisé pour créer les pages HTML à partir de templates.
- **VineJS** : permet de vérifier les données envoyées par les formulaires.
- **Luxon** : utilisé pour manipuler les dates.
- **JavaScript** : permet notamment d'actualiser la disponibilité sans avoir à recharger toute la page.
- **Vite** : utilisé pour gérer les ressources front-end.
- **HTML / CSS** : utilisés pour structurer les pages et travailler leur présentation.
- **Git et GitHub** : utilisés pour suivre les modifications et héberger le code du projet.

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

Créer ou compléter le fichier `.env` avec les variables nécessaires au fonctionnement du projet.

Si aucune clé d'application n'est configurée, générer une clé avec la commande suivante :

```bash
node ace generate:key
```

Copier la clé obtenue dans la variable `APP_KEY` du fichier `.env`.

Le fichier `.env` doit rester local et ne pas être envoyé sur GitHub, car il peut contenir des informations sensibles.

### 4. Créer les tables de la base de données

```bash
node ace migration:run
```

Cette commande exécute les migrations du projet pour créer les tables nécessaires.

### 5. Lancer l'application

```bash
npm run dev
```

L'application est ensuite accessible à l'adresse suivante :

[http://localhost:3333](http://localhost:3333)

## Pages principales

- **Accueil** : [http://localhost:3333/](http://localhost:3333/)
- **Gestion du matériel** : [http://localhost:3333/materials](http://localhost:3333/materials)
- **Réservations** : [http://localhost:3333/reservations](http://localhost:3333/reservations)

## Difficultés rencontrées

### Installation des dépendances

Au début du projet, j'ai rencontré plusieurs erreurs lors de l'installation des dépendances npm, notamment avec une dépendance nécessitant une compilation native. J'ai dû installer les outils de compilation nécessaires sous Windows et adapter la configuration de `node-gyp` avant de réussir à terminer l'installation.

Cette étape m'a permis de mieux comprendre que certains problèmes ne viennent pas forcément du code de l'application, mais aussi de l'environnement de développement.

### Protection CSRF des formulaires

Lors de la création du formulaire d'ajout de matériel, certaines requêtes étaient rejetées parce que le jeton CSRF attendu était absent. J'ai résolu le problème en ajoutant `csrfField()` dans les formulaires Edge.

J'ai ainsi pu mieux comprendre à quoi sert cette protection et pourquoi il est important de ne pas la négliger.

### Gestion des dates et des types

J'ai également rencontré des erreurs TypeScript lors de l'enregistrement des réservations. Les dates reçues depuis les formulaires ne correspondaient pas directement aux types attendus par le modèle.

J'ai dû travailler sur leur validation et leur conversion, ce qui m'a aidé à mieux comprendre le rôle de VineJS, de Luxon et de Lucid dans le traitement des données.

### Calcul de la disponibilité

C'était l'un des points les plus importants de la logique de réservation. Au départ, il fallait surtout comprendre comment calculer correctement le stock disponible en fonction des dates choisies.

Il ne suffisait pas de soustraire toutes les quantités déjà réservées : deux réservations portant sur des périodes différentes ne mobilisent pas forcément le stock au même moment. J'ai donc dû prendre en compte les chevauchements entre les dates et exclure les réservations annulées pour obtenir une disponibilité cohérente.

## Utilisation de l'intelligence artificielle

J'ai utilisé ChatGPT et Gemini à différents moments du projet, principalement pour m'aider à avancer lorsque je rencontrais une difficulté ou que je cherchais à améliorer certains éléments de l'application.

### ChatGPT : comprendre et développer

J'ai surtout utilisé ChatGPT pour m'aider à comprendre le fonctionnement d'AdonisJS et les différentes parties du projet. Cela m'a notamment servi à comprendre certaines erreurs, à travailler sur les fonctionnalités et à mieux voir comment les routes, les contrôleurs, les modèles, les validateurs et la base de données fonctionnent ensemble.

L'objectif n'était pas simplement de récupérer du code, mais aussi de comprendre ce que je faisais et pourquoi certaines solutions étaient nécessaires.

### Gemini : travailler le design et le CSS

J'ai utilisé Gemini davantage pour la partie visuelle de l'application, notamment pour trouver des idées de mise en forme et travailler le CSS.

Cela m'a aidé à améliorer la présentation des pages, des formulaires, des boutons et des messages affichés à l'utilisateur, afin d'obtenir une interface plus cohérente et agréable à utiliser.

Les propositions de Gemini ont ensuite été adaptées à mon projet et à la structure de mes pages.

### Ce que j'en retiens

L'intelligence artificielle m'a fait gagner du temps, mais les réponses n'étaient pas toujours directement adaptées à mon code. Il fallait parfois modifier les propositions, vérifier qu'elles fonctionnaient et comprendre les erreurs qui pouvaient apparaître.

J'ai surtout retenu qu'il est utile de s'en servir pour débloquer une situation ou mieux comprendre un concept, à condition de ne pas appliquer aveuglément tout ce qu'elle propose.

## État du projet

Les principales fonctionnalités de gestion du matériel et de réservation sont implémentées.

Il est possible d'ajouter et de modifier du matériel, de créer et d'annuler des réservations et de vérifier la disponibilité des équipements en fonction des dates et des quantités demandées.

Ce projet m'a permis de mieux comprendre le fonctionnement d'une application back-end avec AdonisJS et de mettre en pratique plusieurs notions abordées pendant le cours.