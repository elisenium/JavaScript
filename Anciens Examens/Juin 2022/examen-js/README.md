# Site des Exoplanètes

## Démarrer le projet

Inutile de faire un `npm install`, le projet est déjà configuré, et les dépendances sont déjà téléchargées.

Pour démarrer le projet, allez dans le dossier `examen-js` et exécutez la commande `npm start` dans un terminal.

Lorsque vous faites des modifications, inutile de relancer le projet, il est relancé automatiquement (nodemon s'en occupe).

## Base de données

La base de données utilisée est `exoplanets.db` à la racine du projet. Si vous la modifiez, et que vous souhaitez revenir à la version "initiale", supprimez-la, et copiez le fichier `exoplanets-backup.db` en le nommant `exoplanets.db`. Ce fichier de backup est identique à la base de données initiale. Ne le supprimez pas !

Le contenu de la base de données est listé dans la partie "Introduction" de l'énoncé d'examen.

L'accès à la base de données est déjà pré-configuré. Inutile de modifier le fichier `db_conf.js`.