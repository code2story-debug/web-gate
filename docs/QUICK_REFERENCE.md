# 🚀 Quick Reference - Working Configuration

## ✅ Current Status

- **Email System:** ✅ WORKING - Receiving emails when users register
- **GitHub:** ✅ Deployed and working
- **Mobile Browsers:** ⚠️ SSL issue (Safari/Chrome mobile)

## 📁 Key Files (DO NOT BREAK)

### Critical Files:
- `lib/waitlist.ts` - Email submission logic
- `lib/supabase.ts` - Database connection
- `app/components/WaitlistForm.tsx` - Form handler
- `app/components/ComingSoonLanding.tsx` - Main page

### Supabase Configuration:
- Edge Function: `swift-action` ✅
- Webhook: `send_welcome_email` ✅
- Secret: `RESEND_API_KEY` ✅

## 🔒 Before Making Changes

1. **Create backup branch:**
   ```bash
   git checkout -b backup-$(date +%Y%m%d)
   git commit -am "Backup before changes"
   ```

2. **Test locally:**
   ```bash
   npm run dev
   # Test email submission
   ```

3. **Verify email works:**
   - Submit test email
   - Check Supabase database
   - Verify email received

4. **Only then push:**
   ```bash
   git push origin master
   ```

## 🆘 If Email System Breaks

1. **Revert immediately:**
   ```bash
   git checkout backup-YYYYMMDD
   git push origin master --force
   ```

2. **Check:**
   - Supabase Edge Function logs
   - Webhook status
   - Resend API dashboard

## 📱 Mobile SSL Issue

**Problem:** "Connection is not private" on mobile browsers

**Quick Fixes:**
1. Check SSL certificate: https://www.ssllabs.com/ssltest/analyze.html?d=code2story.com
2. Verify hosting provider SSL settings
3. Check for mixed content (HTTP/HTTPS)
4. Clear mobile browser cache

**See:** `MOBILE_SSL_INVESTIGATION.md` for detailed steps

## 📚 Documentation Files

- `WORKING_CONFIGURATION_BACKUP.md` - Complete working config
- `COMPLETE_BACKUP_SNAPSHOT.md` - Full backup snapshot
- `SAFE_UPDATE_CHECKLIST.md` - Safe update process
- `MOBILE_SSL_INVESTIGATION.md` - Mobile SSL fix guide

## 🎯 Golden Rules

1. ✅ **If it works, don't break it**
2. ✅ **Always test before pushing**
3. ✅ **Create backup branches**
4. ✅ **Document changes**
5. ✅ **Verify email system after any changes**

---

**Last Updated:** February 5, 2026  
**Status:** ✅ Email system operational
