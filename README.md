# Gestion du matériel — AdonisJS Lab

## Présentation

Application web de gestion de matériel développée dans le cadre du projet AdonisJS Lab en BUT Métiers du Multimédia et de l'Internet (MMI).

L'objectif est de permettre de répertorier du matériel et de gérer ses informations depuis une interface web.

## Fonctionnalités

- Affichage de la liste du matériel disponible.
- Ajout d'un matériel avec son nom, sa catégorie, sa description et sa quantité.
- Validation des données côté serveur avec VineJS.
- Enregistrement des données dans une base SQLite.
- Protection des formulaires contre les requêtes CSRF.

## Technologies utilisées

- **AdonisJS** : framework backend.
- **TypeScript** : langage de programmation.
- **Lucid ORM** : interactions avec la base de données.
- **SQLite** : système de base de données.
- **Edge** : moteur de templates pour les vues.
- **VineJS** : validation des données.
- **Git et GitHub** : gestion de versions et hébergement du code.

## Installation et lancement

### Prérequis

- Node.js
- npm

### Installation

Cloner le dépôt :

```bash
git clone https://github.com/Mimnjim/Projet-Adonisjs-Lab.git
cd Projet-Adonisjs-Lab
```

Installer les dépendances :

```bash
npm install
```

Configurer les variables d'environnement à partir du fichier d'exemple fourni par le projet, s'il existe, ou suivre les instructions de configuration d'AdonisJS.

Exécuter les migrations :

```bash
node ace migration:run
```

Lancer le serveur de développement :

```bash
npm run dev
```

L'application est ensuite accessible à l'adresse suivante :

http://localhost:3333

La page de gestion du matériel est disponible sur `/materials`.

## État du projet

Le projet est en cours de développement. L'affichage et l'ajout de matériel sont fonctionnels. Les prochaines étapes porteront notamment sur la modification et la suppression des matériels.

## Utilisation de l'intelligence artificielle

L'intelligence artificielle a été utilisée comme outil d'accompagnement pour comprendre le fonctionnement d'AdonisJS, structurer le code, résoudre certaines erreurs et progresser dans l'implémentation des fonctionnalités.

Les propositions de code sont testées et adaptées au projet au fur et à mesure du développement.