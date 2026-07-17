# Migration plan

Do not scrape `anewspaper.net` without authorization.

1. Export CSV/JSON from current CMS or archives vendor
2. Use templates in `import-templates/` (articles, obituaries, events, archives)
3. Map categories to NVO taxonomy
4. Preview import in staging DB
5. Detect duplicate slugs before write
6. Import images via allowed URLs into media library / Cloudinary later
7. Cut over DNS/content after staff QA

Phase 1–2 currently seed safe demo content only.
