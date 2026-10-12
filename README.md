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
- `HeroVideo` remplace l’ancien contrôleur au scroll par une lecture décorative contrôlée : lecture sur ordinateur et mobile, pause hors écran ou onglet masqué, portrait en alternative et commande de désactivation.
- `app/lib/contact.ts` vérifie la confirmation du service FormSubmit. Le formulaire conserve la saisie en cas d’échec.

Les coordonnées professionnelles et l’endpoint FormSubmit existants sont conservés. La réception réelle des messages reste à vérifier séparément.
