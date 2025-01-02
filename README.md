🌦️ WeaRther Forecast 🌟

Dans le cadre de ma formation en développement web, j'ai travaillé avec une équipe sur WeaRther Forecast, une application web météo moderne et interactive.

🚀 Objectifs du projet
Exploiter les données d'une API pour afficher des informations météorologiques et les organiser dans un tableau.
Intégrer des fonctionnalités comme la géolocalisation et une barre de recherche intuitive.
Permettre la personnalisation grâce au stockage des données dans le local storage.
🛠️ Fonctionnalités principales
Today

Météo actuelle et précipitations sur les 3 prochaines heures.
Suggestions vestimentaires personnalisées.
DayByDay

Prévisions météo sur 5 jours.
WeatherNews

Actualités météo à l’échelle mondiale.
My Cities

Gestion des favoris pour un accès rapide à vos villes préférées.
My Preferences

Paramètres personnalisés (sensibilité climatique et moyen de transport).
🌟 Impact du projet
WeaRther Forecast aide les utilisateurs à planifier leur journée en tenant compte des conditions météorologiques locales, tout en leur offrant des recommandations vestimentaires adaptées.

📷 Aperçu


![1734606949300](https://github.com/user-attachments/assets/2c0bb0f4-cec1-4784-9da0-a8c46e506b75)

🎥 Démonstration
Découvrez notre application en action : [Voir la démo](https://www.canva.com/design/DAGZuuJ5cEM/7JaCFqHqHd95j7RLLd5Hdg/edit).

📂 Liens utiles

Présentation du projet : [Slide de présentation](https://www.canva.com/design/DAGXwmiCMI8/_RDsbr1KAB2vHAcsds33Qw/edit)

👥 Équipe du projet

Émilie : Architecture, géolocalisation, favoris.

Thibaut : Météo actuelle, précipitations, sécurité.

Julien : Prévisions jour par jour, actualités météo.

Cyrus : Recommandations vestimentaires, préférences.

🛠️ Technologies utilisées

Front-end : React, CSS

Back-end : API OpenWeatherMap
Stockage : Local Storage
Vos retours sont les bienvenus ! 🚀




# JS-Nantes-P2-Spotywild

Ce projet est un monorepo JS, suivant l'architecture React-Express-MySQL telle qu'enseignée à la Wild Code School (v7.1.7) :

```mermaid
sequenceDiagram
    box Web Client
    participant React as React
    participant Fetcher as Fetcher
    end
    box Web Server
    participant Express as Express
    participant Module as Module
    end
    box DB Server
    participant DB as MySQL Server
    end

    React-)Fetcher: event
    activate Fetcher
    Fetcher-)Express: requête (HTTP)
    activate Express
    Express-)Module: appel
    activate Module
    Module-)DB: requête SQL
    activate DB
    DB--)Module: données
    deactivate DB
    Module--)Express: json
    deactivate Module
    Express--)Fetcher: réponse HTTP
    deactivate Express
    Fetcher--)React: render
    deactivate Fetcher
```

Il est pré-configuré avec un ensemble d'outils pour aider les étudiants à produire du code de qualité industrielle, tout en restant un outil pédagogique :

- **Concurrently** : Permet d'exécuter plusieurs commandes simultanément dans le même terminal.
- **Husky** : Permet d'exécuter des commandes spécifiques déclenchées par des événements _git_.
- **Vite** : Alternative à _Create-React-App_, offrant une expérience plus fluide avec moins d'outils.
- **Biome** : Alternative à _ESlint_ et _Prettier_, assurant la qualité du code selon des règles choisies.
- **Supertest** : Bibliothèque pour tester les serveurs HTTP en node.js.

## Table des Matières

- [JS-Nantes-P2-Spotywild](#name)
  - [Table des Matières](#table-des-matières)
  - [Utilisateurs Windows](#utilisateurs-windows)
  - [Installation \& Utilisation](#installation--utilisation)
  - [Les choses à retenir](#les-choses-à-retenir)
    - [Commandes de Base](#commandes-de-base)
    - [Structure des Dossiers](#structure-des-dossiers)
    - [Mettre en place la base de données](#mettre-en-place-la-base-de-données)
    - [Développer la partie back-end](#développer-la-partie-back-end)
    - [REST](#rest)
    - [Autres Bonnes Pratiques](#autres-bonnes-pratiques)
  - [FAQ](#faq)
    - [Déploiement avec Traefik](#déploiement-avec-traefik)
    - [Variables d'environnement spécifiques](#variables-denvironnement-spécifiques)
    - [Logs](#logs)
    - [Contribution](#contribution)

## Utilisateurs Windows

Assurez-vous de lancer ces commandes dans un terminal Git pour éviter [les problèmes de formats de nouvelles lignes](https://en.wikipedia.org/wiki/Newline#Issues_with_different_newline_formats) :

```sh
git config --global core.eol lf
git config --global core.autocrlf false
```

## Installation & Utilisation

1. Installez le plugin **Biome** dans VSCode et configurez-le.
2. Clonez ce dépôt, puis accédez au répertoire cloné.
3. Exécutez la commande `npm install`.
4. Créez des fichiers d'environnement (`.env`) dans les répertoires `server` et `client` : vous pouvez copier les fichiers `.env.sample` comme modèles (**ne les supprimez pas**).

## Les choses à retenir

### Commandes de Base

| Commande               | Description                                                                 |
|------------------------|-----------------------------------------------------------------------------|
| `npm install`          | Installe les dépendances pour le client et le serveur                       |
| `npm run db:migrate`   | Met à jour la base de données à partir d'un schéma défini                   |
| `npm run dev`          | Démarre les deux serveurs (client et serveur) dans un seul terminal         |
| `npm run check`        | Exécute les outils de validation (linting et formatage)                     |
| `npm run test`         | Exécute les tests unitaires et d'intégration                                |

### Structure des Dossiers

```plaintext
my-project/
│
├── server/
│   ├── app/
│   │   ├── modules/
│   │   │   ├── item/
│   │   │   │   ├── itemActions.ts
│   │   │   │   └── itemRepository.ts
│   │   │   └── ...
│   │   ├── app.ts
│   │   ├── main.ts
│   │   └── router.ts
│   ├── database/
│   │   ├── client.ts
│   │   └── schema.sql
│   ├── tests/
│   ├── .env
│   └── .env.sample
│
└── client/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── App.tsx
    ├── .env
    └── .env.sample
```

### Mettre en place la base de données

**Créer et remplir le fichier `.env`** dans le dossier `server` :

```plaintext
DB_HOST=localhost
DB_PORT=3306
DB_USER=not_root
DB_PASSWORD=password
DB_NAME=my_database
```

**Les variables sont utilisés** dans `server/database/client.ts` :

```typescript
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

import mysql from "mysql2/promise";

const client = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT as number | undefined,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

export default client;
```

**Créer une table** dans `server/database/schema.sql` :

```sql
CREATE TABLE item (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES user(id)
);
```

**Insérer des données** dans `server/database/schema.sql` :

```sql
INSERT INTO item (title, user_id) VALUES
  ('Sample Item 1', 1),
  ('Sample Item 2', 2);
```

**Synchroniser la BDD avec le schema** :

```sh
npm run db:migrate
```

### Développer la partie back-end

**Créer une route** dans `server/app/router.ts` :

```typescript
// ...

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);

/* ************************************************************************* */

// ...
```

**Définir une action** dans `server/app/modules/item/itemActions.ts` :

```typescript
import type { RequestHandler } from "express";

import itemRepository from "./itemRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const items = await itemRepository.readAll();

    res.json(items);
  } catch (err) {
    next(err);
  }
};

export default { browse };
```

**Accéder aux données** dans `server/app/modules/item/itemRepository.ts` :

```typescript
import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

interface Item {
  id: number;
  title: string;
  user_id: number;
}

class ItemRepository {
  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from item");

    return rows as Item[];
  }
}

export default new ItemRepository();
```

**Ajouter un middleware** 

```typescript
// ...

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

const foo: RequestHandler = (req, res, next) => {
  req.message = "hello middleware";

  next();
}

router.get("/api/items", foo, itemActions.browse);

/* ************************************************************************* */

// ...
```

`req.message` sera disponible dans `itemActions.browse`.

⚠️ La propriété `message` doit être ajoutée dans `src/types/express/index.d.ts` :

```diff
// to make the file a module and avoid the TypeScript error
export type {};

declare global {
  namespace Express {
    export interface Request {
      /* ************************************************************************* */
      // Add your custom properties here, for example:
      //
      // user?: { ... };
      /* ************************************************************************* */
+      message: string;
    }
  }
}
```

### REST

| Opération | Méthode | Chemin d'URL | Corps de la requête | SQL    | Réponse (Succès)               | Réponse (Erreur)                                                       |
|-----------|---------|--------------|---------------------|--------|--------------------------------|------------------------------------------------------------------------|
| Browse    | GET     | /items       |                     | SELECT | 200 (OK), liste des items.     |                                                                        |
| Read      | GET     | /items/:id   |                     | SELECT | 200 (OK), un item.             | 404 (Not Found), si id invalide.                                       |
| Add       | POST    | /items       | Données de l'item   | INSERT | 201 (Created), id d'insertion. | 400 (Bad Request), si corps invalide.                                  |
| Edit      | PUT     | /items/:id   | Données de l'item   | UPDATE | 204 (No Content).              | 400 (Bad Request), si corps invalide. 404 (Not Found), si id invalide. |
| Destroy   | DELETE  | /items/:id   |                     | DELETE | 204 (No Content).              | 404 (Not Found), si id invalide.                                       |

### Autres Bonnes Pratiques

- **Sécurité** :
  - Validez et échappez toujours les entrées des utilisateurs.
  - Utilisez HTTPS pour toutes les communications réseau.
  - Stockez les mots de passe de manière sécurisée en utilisant des hash forts (ex : argon2).
  - Revoyez et mettez à jour régulièrement les dépendances.

- **Code** :
  - Suivez les principes SOLID pour une architecture de code propre et maintenable.
  - Utilisez TypeScript pour bénéficier de la vérification statique des types.
  - Adoptez un style de codage cohérent avec Biome.
  - Écrivez des tests pour toutes les fonctionnalités critiques.

## FAQ

### Déploiement avec Traefik

> ⚠️ Prérequis : Vous devez avoir installé et configuré Traefik sur votre VPS au préalable. Suivez les instructions ici : [VPS Traefik Starter Kit](https://github.com/WildCodeSchool/vps-traefik-starter-kit/).

Pour le déploiement, ajoutez les secrets suivants dans la section `secrets` → `actions` du dépôt GitHub :

- `SSH_HOST` : Adresse IP de votre VPS
- `SSH_USER` : Identifiant SSH pour votre VPS
- `SSH_PASSWORD` : Mot de passe de connexion SSH pour votre VPS

Et une variable publique dans `/settings/variables/actions` :

- `PROJECT_NAME` : Le nom du projet utilisé pour créer le sous-domaine.

> ⚠️ Avertissement : Les underscores ne sont pas autorisés car ils peuvent causer des problèmes avec le certificat Let's Encrypt.

L'URL de votre projet sera `https://${PROJECT-NAME}.${subdomain}.wilders.dev/`.

### Variables d'environnement spécifiques

Les étudiants doivent utiliser le modèle fourni dans le fichier `*.env.sample*` en suivant la convention `<PROJECT_NAME><SPECIFIC_NAME>=<THE_VARIABLE>`.

> ⚠️ **Avertissement:** Le `PROJECT_NAME` doit correspondre à celui utilisé dans la variable publique Git.

Pour l'ajouter lors du déploiement, suivez ces deux étapes :

1. Ajoutez la variable correspondante dans le fichier `docker-compose.prod.yml` (comme montré dans l'exemple : `PROJECT_NAME_SPECIFIC_NAME: ${PROJECT_NAME_SPECIFIC_NAME}`).
2. Connectez-vous à votre serveur via SSH. Ouvrez le fichier `.env` global dans Traefik (`nano ./traefik/data/.env`). Ajoutez la variable avec la valeur correcte et sauvegardez le fichier.

Après cela, vous pouvez lancer le déploiement automatique. Docker ne sera pas rafraîchi pendant ce processus.

### Logs

Pour accéder aux logs de votre projet en ligne (pour suivre le déploiement ou surveiller les erreurs), connectez-vous à votre VPS (`ssh user@host`). Ensuite, allez dans votre projet spécifique et exécutez `docker compose logs -t -f`.

### Contribution

Nous accueillons avec plaisir les contributions ! Veuillez suivre ces étapes pour contribuer :

1. **Fork** le dépôt.
2. **Clone** votre fork sur votre machine locale.
3. Créez une nouvelle branche pour votre fonctionnalité ou bug fix (`git switch -c feature/your-feature-name`).
4. **Commit** vos modifications (`git commit -m 'Add some feature'`).
5. **Push** vers votre branche (`git push origin feature/your-feature-name`).
6. Créez une **Pull Request** sur le dépôt principal.

**Guide de Contribution** :

- Assurez-vous que votre code respecte les standards de codage en exécutant `npm run check` avant de pousser vos modifications.
- Ajoutez des tests pour toute nouvelle fonctionnalité ou correction de bug.
- Documentez clairement vos modifications dans la description de la pull request.
