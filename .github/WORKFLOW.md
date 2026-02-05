# GitHub Workflow - Safe Deployment Process

## Current Status: ✅ WORKING

- Email system: ✅ Operational
- GitHub: ✅ Deployed
- Mobile browsers: ⚠️ SSL issue (being investigated)

## Safe Push Process

### 1. Before Pushing
```bash
# Always create backup branch first
git checkout -b backup-before-push-$(date +%Y%m%d)
git add .
git commit -m "Backup before push"
git push origin backup-before-push-$(date +%Y%m%d)

# Then make your changes
git checkout master
# ... make changes ...
git add .
git commit -m "Your changes"
```

### 2. Test Locally
```bash
npm run dev
# Test email submission
# Test on mobile browser
# Verify everything works
```

### 3. Push to GitHub
```bash
git push origin master
```

### 4. Verify After Push
- [ ] Check deployed site
- [ ] Test email submission
- [ ] Verify emails are received
- [ ] Check mobile browsers

## If Deployment Breaks

1. **Revert immediately:**
   ```bash
   git revert HEAD
   git push origin master
   ```

2. **Or restore from backup:**
   ```bash
   git checkout backup-before-push-YYYYMMDD
   git checkout -b master-restore
   git push origin master-restore
   ```

## Environment Variables

**Never commit these to GitHub:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RESEND_API_KEY`

**Set in:**
- Local: `.env.local` (gitignored)
- Production: Hosting provider (Vercel/Netlify) environment variables
- Supabase: Edge Function secrets

---

**Remember:** Test locally, then push. If it works, don't break it!
