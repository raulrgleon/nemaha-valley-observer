# Editorial workflow

Statuses:

1. **DRAFT** — reporter working copy
2. **REVIEW** — awaiting editor
3. **SCHEDULED** — publish at `scheduledAt` (UI ready; cron can be added)
4. **PUBLISHED** — live on site
5. **ARCHIVED** — removed from primary listings

Roles:

- **ADMIN / EDITOR** — can publish
- **REPORTER / CONTRIBUTOR** — create/edit; publish attempts downgrade to REVIEW
- **SUBSCRIBER / ADVERTISER** — no CMS access

Community events submit as **PENDING** until staff approve in `/admin/events`.
