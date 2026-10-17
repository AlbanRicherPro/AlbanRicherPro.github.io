# Portfolio d’Alban Richer

Portfolio en français construit avec Next.js 16, React 19 et Tailwind CSS 4.

## Démarrer

```sh
npm install
npm run dev
```

Le site est disponible sur http://localhost:3000.

## Vérifications

```sh
npm run lint
npx tsc --noEmit
node --test tests/contact.test.mjs
npm run build
```

Les tests du contact utilisent les mocks natifs de Node.js et n’envoient aucun message. Node.js 22.18+ ou 24 est nécessaire pour importer directement les fichiers TypeScript dans ces tests.

Si Turbopack ne peut pas ouvrir un port pour son worker dans un environnement restreint, la compilation peut être vérifiée avec `npx next build --webpack`. Les polices Geist sont téléchargées par `next/font` à la compilation ; un accès à Google Fonts est donc nécessaire à cette étape.

## Organisation

- `app/page.tsx` compose les sections côté serveur.
- `app/globals.css` contient la palette charbon/abricot, la typographie, les règles responsive et les durées de mouvement.
- `Navigation` gère le menu mobile, le focus et les sections actives.
- `Reveal` partage un observer entre les apparitions. Le contenu est visible sans JavaScript et les animations respectent le mouvement réduit.
- `SkillsSection` présente la stack principale et quatre domaines avec des exemples dépliables. Les technologies complémentaires restent accessibles dans un accordéon natif.
- `HeroVideo` remplace l’ancien contrôleur au scroll par une lecture décorative contrôlée : lecture sur ordinateur et mobile, pause hors écran ou onglet masqué, première image de la vidéo en alternative. Le poster est enregistré dans `public/videos/pointing-down-poster.jpg`.
- `app/lib/contact.ts` vérifie la confirmation du service FormSubmit. Le formulaire conserve la saisie en cas d’échec.

Les coordonnées professionnelles et l’endpoint FormSubmit existants sont conservés. La réception réelle des messages reste à vérifier séparément.

Les logos Vue.js, Vuetify, Vite, TypeScript, Symfony, PHP, Flutter, Sentry, Docker, ClickUp, GitHub, GitHub Actions et Cypress proviennent de [Simple Icons](https://github.com/simple-icons/simple-icons). Le visuel API Platform provient de son [site officiel](https://api-platform.com/). Les logos OpenAI et Claude proviennent de [Lobe Icons](https://github.com/lobehub/lobe-icons), et celui de Devin de son [site officiel](https://devin.ai/favicon.svg). Ils sont enregistrés dans `public/stack` et servis localement. Les pratiques utilisent des pictogrammes du site.

Le cœur vendéen du footer est adapté du [visuel de Wikicontributeur](https://commons.wikimedia.org/wiki/File:Coeur_vendeen.svg), sous [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) : simplification du SVG et couleur pêche.

Le thème suit `prefers-color-scheme` (clair/sombre). La langue suit la première préférence `fr` ou `en` de `navigator.languages`, avec l’anglais comme repli pour les autres langues. Le HTML exporté reste en français ; `useSyncExternalStore` applique la préférence après l’hydratation, puis suit `languagechange`, sans modifier les valeurs saisies dans le formulaire.

Les sélecteurs de la navigation permettent de choisir le thème (`Système`, `Clair`, `Sombre`) et la langue (`Navigateur`, `Français`, `English`). Les choix explicites sont conservés localement ; les modes automatiques rétablissent les préférences du système et du navigateur.

Le favicon SVG (`app/icon.svg`) adapte son fond et ses lettres au thème clair/sombre du navigateur via `prefers-color-scheme`. Le favicon ICO sert de repli avec un fond sombre contrasté. Cette préférence suit l’interface du navigateur, indépendamment du thème choisi pour la page.
