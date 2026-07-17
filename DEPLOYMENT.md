# Deployment

## Production host

- App path: `/mnt/HC_Volume_106253137/newspaper.deto.llc`
- Symlink: `/var/www/newspaper.deto.llc`
- Systemd: `newspaper.service` (PORT 3004)
- Nginx: `newspaper.deto.llc` → `127.0.0.1:3004`
- Database: PostgreSQL `nvo_newspaper` on tablespace `nvo_space` (volume)

## Deploy steps

1. Sync project to volume (exclude `node_modules`, `.next`, `.git`, `._*`)
2. `npm install`
3. Ensure `.env` has `DATABASE_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_SITE_URL`
4. `npx prisma db push && npm run db:seed`
5. `npm run build`
6. `systemctl restart newspaper`

## Optional secrets

- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_DIGITAL`
- `RESEND_API_KEY`, `EMAIL_FROM`
- `OPENWEATHER_API_KEY`

Without these, public UI still works with demo weather and offline checkout messaging.
