# ✅ Safe Update Checklist - Prevent Breaking Email System

## 🚨 BEFORE Making ANY Changes

### Step 1: Create Backup Branch
```bash
git checkout -b backup-YYYY-MM-DD-before-changes
git add .
git commit -m "Backup: Working email system before changes"
git push origin backup-YYYY-MM-DD-before-changes
```

### Step 2: Document What You're Changing
- [ ] List all files you plan to modify
- [ ] Explain why you're changing them
- [ ] Identify what could break
- [ ] Plan rollback strategy

### Step 3: Test Locally First
```bash
npm run dev
# Test on http://localhost:3000
# Submit test email
# Verify it works
```

### Step 4: Verify Email System Still Works
- [ ] Submit test email through form
- [ ] Check Supabase database (email appears)
- [ ] Check Supabase Edge Function logs
- [ ] Verify email is sent via Resend
- [ ] Check your inbox for test email

### Step 5: Test on Mobile
- [ ] Test on Safari iOS
- [ ] Test on Chrome Android
- [ ] Verify no SSL errors
- [ ] Test form submission

### Step 6: Only Then Push to GitHub
```bash
git checkout master
git merge your-feature-branch
git push origin master
```

---

## 🔒 Files That MUST NOT Change Without Testing

### Critical Files (Email System):
- ❌ `lib/waitlist.ts` - Email submission logic
- ❌ `lib/supabase.ts` - Database connection
- ❌ `app/components/WaitlistForm.tsx` - Form handler
- ❌ Supabase Edge Function `swift-action`
- ❌ Supabase webhook configuration

### Important Files (Design):
- ⚠️ `app/components/ComingSoonLanding.tsx` - Main layout
- ⚠️ `app/globals.css` - Styles
- ⚠️ `app/layout.tsx` - Root layout

---

## 📋 Pre-Push Checklist

Before pushing to GitHub, verify:

- [ ] Email form submits successfully
- [ ] Email appears in Supabase database
- [ ] Edge Function logs show success
- [ ] Email is received in inbox
- [ ] No console errors
- [ ] Mobile browsers work (Safari/Chrome)
- [ ] No SSL errors on mobile
- [ ] Cookie banner works
- [ ] Verification page works

---

## 🆘 If Something Breaks

### Immediate Rollback:
```bash
git checkout backup-YYYY-MM-DD-before-changes
git push origin master --force  # Only if necessary
```

### Check These:
1. Supabase Edge Function logs
2. Webhook status in Supabase
3. Resend API dashboard
4. Browser console errors
5. Network tab for failed requests

---

## 📝 Update This Document

After making changes:
1. Update `WORKING_CONFIGURATION_BACKUP.md` with new state
2. Document what changed
3. Note any new dependencies or configs

---

**Golden Rule:** If the email system is working, test EVERYTHING before changing ANYTHING.
