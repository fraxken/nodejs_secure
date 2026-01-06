# Plan de formation sur la sécurité

Matin

- Introduction aux termes (SCA, CVE, Supply-chain, SBOM)
- Questions sur les connaissances et expériences (audit, test d'intrusion)
- Slides sur les risques communs en Node.js
- Les bases de la sécurité d'un projet Node.js/NPM
    -> Configuration du fichier .npmrc
    -> Fonctionnement de NPM (résolution de l'arbre, persistance en lockfile)
    -> Scripts NPM (exemple avec better-sqlite3).
    -> LavaMoat allow-scripts (natif sur PNPM).
    -> Vérification d'un package avec NodeSecure.
    -> Gestion des ENVs.
    -> Lockfile poisoning (lockfile-lint --path package-lock.json --validate-https --allowed-hosts npm yarn)
    -> Les autres risques (PDF)
- Découverte des outils SCA (gratuit) Socket.dev et Snyk.
- Gérer la maintenance et mise à jour d'un vieux projet Node.js (napi-headers)

Aprem

- Workshop defensive coding (1h)
    - Voir des exemples de sandboxing avec SES et VM2.
- Autres exemples d'attaques
- Sécurisation d'un projet GitHub (protection des branches, PIN des artefacts CI, permissions...)
- Faire une revue global du PDF (draft)

- Questions/Réponses
