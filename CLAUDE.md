# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

Portfolio personnel statique — HTML/CSS/JS vanilla, sans framework ni dépendance.

**Fichiers à la racine :**
- `index.html` — structure complète du portfolio (navbar, hero, about, skills, projects, contact, footer)
- `style.css` — tous les styles
- `script.js` — interactions (hamburger menu, typewriter, scroll reveal via IntersectionObserver, formulaire)
- `assets/` — polices et images

**Assets :**
- `assets/fonts/SpaceGrotesk-VariableFont_wght.ttf` — police variable self-hosted
- `assets/logo_white.png` / `logo_bg_transparent.png` / `logo_favicon.ico` / `logo_black.*`

## Design system

Variables CSS définies dans `:root` de `style.css` :
- `--primary: #353535` — fond principal
- `--primary-dark: #2a2a2a` — fond des sections alternées et footer
- `--secondary: #D9D9D9` — couleur de texte
- `--accent: #00BFFF` — couleur d'accentuation (bleu)
- `--card-bg: #2e2e2e` — fond des cartes

## Développement

Pas de build — ouvrir `index.html` directement dans un navigateur ou via un serveur local :

```bash
npx serve .
# ou
python3 -m http.server
```

## Conventions

- Les animations au scroll utilisent la classe `.reveal` + `IntersectionObserver` (dans `script.js`).
- Les sections alternent entre `--primary` et `--primary-dark` pour créer une séparation visuelle.
- Le layout est responsive avec un breakpoint hamburger à `768px`.
