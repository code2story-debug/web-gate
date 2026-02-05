# 🔒 WORKING CONFIGURATION BACKUP - DO NOT BREAK

**Last Updated:** February 5, 2026  
**Status:** ✅ WORKING - Email system operational, GitHub deployed successfully

## ⚠️ CRITICAL: DO NOT MODIFY THESE FILES WITHOUT BACKUP

This document contains the exact working configuration. Any changes to these files could break the email system.

---

## 📋 Current Working Setup

### ✅ Email System Status
- **Waitlist emails:** ✅ Working
- **Email notifications:** ✅ Receiving emails when users register
- **Supabase Edge Function:** ✅ `swift-action` deployed and working
- **Resend API:** ✅ Configured and sending emails
- **Double opt-in:** ✅ Implemented

### ✅ GitHub Status
- **Repository:** https://github.com/code2story-debug/web-gate
- **Branch:** master
- **Status:** ✅ Deployed and working

---

## 🔧 Critical Configuration Files

### 1. Supabase Configuration

**File:** `lib/supabase.ts`
```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Environment Variables Required:**
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key

### 2. Waitlist Business Logic

**File:** `lib/waitlist.ts`
- ✅ Email validation
- ✅ Double opt-in flow
- ✅ Verification token generation
- ✅ Database insert with `verified: false`
- ✅ Verification function

**DO NOT CHANGE:** The database schema expects:
- `email` (text)
- `verification_token` (text)
- `verified` (boolean, default false)
- `verified_at` (timestamp)

### 3. Waitlist Form Component

**File:** `app/components/WaitlistForm.tsx`
- ✅ Email input validation
- ✅ Error handling
- ✅ Success state
- ✅ Loading state ("Orchestrating...")
- ✅ Calls `addToWaitlist()` from `lib/waitlist.ts`

**DO NOT CHANGE:** The form submission flow or validation logic.

### 4. Edge Function Configuration

**Function Name:** `swift-action`  
**Location:** Supabase Dashboard → Edge Functions

**Critical Settings:**
- ✅ Secret: `RESEND_API_KEY` = `re_cnb6ZQR1_EKyxixemg3KGans3SikWxZ5S`
- ✅ Webhook: Database → Webhooks → `send_welcome_email`
  - Table: `waitlist`
  - Events: `INSERT`
  - Function: `swift-action`

**DO NOT CHANGE:** Function name or webhook configuration without updating both.

---

## 🚨 Mobile Browser SSL Issue Investigation

### Problem
- ❌ Safari mobile: "Connection is not private"
- ❌ Chrome mobile: SSL error
- ✅ Desktop browsers: Working fine
- ✅ Same domain: `code2story.com`

### Possible Causes

1. **SSL Certificate Issues**
   - Mobile browsers are stricter about SSL certificates
   - Certificate might not be trusted on mobile
   - Mixed content (HTTP resources on HTTPS page)

2. **Certificate Chain Issues**
   - Missing intermediate certificates
   - Certificate not properly configured for mobile

3. **DNS/CDN Configuration**
   - If using Cloudflare or CDN, SSL settings might differ
   - Mobile might be hitting different edge servers

4. **Mixed Content**
   - HTTP resources loaded on HTTPS page
   - Supabase URLs might be HTTP instead of HTTPS

### Investigation Steps

1. **Check SSL Certificate:**
   - Visit: https://www.ssllabs.com/ssltest/analyze.html?d=code2story.com
   - Look for mobile compatibility issues
   - Check certificate chain completeness

2. **Check Supabase URLs:**
   - Ensure `NEXT_PUBLIC_SUPABASE_URL` uses `https://`
   - No mixed HTTP/HTTPS content

3. **Check Next.js Configuration:**
   - Verify `next.config.ts` doesn't have insecure settings
   - Check if headers are properly configured

---

## 📝 Safe Update Process

### Before Making ANY Changes:

1. ✅ **Create a Git branch:**
   ```bash
   git checkout -b backup-before-changes
   git add .
   git commit -m "Backup before changes"
   ```

2. ✅ **Document what you're changing:**
   - Which files?
   - Why?
   - What could break?

3. ✅ **Test locally first:**
   ```bash
   npm run dev
   # Test email submission
   # Test on mobile browser
   ```

4. ✅ **Test on staging (if available) before production**

5. ✅ **Only push to GitHub after thorough testing**

### Files That MUST NOT Change Without Careful Testing:

- ❌ `lib/waitlist.ts` - Email submission logic
- ❌ `lib/supabase.ts` - Database connection
- ❌ `app/components/WaitlistForm.tsx` - Form submission
- ❌ Supabase Edge Function `swift-action`
- ❌ Supabase webhook configuration
- ❌ Environment variables structure

---

## 🔍 Mobile SSL Fix Checklist

### Immediate Actions:

1. **Verify SSL Certificate:**
   - [ ] Check SSL Labs report for code2story.com
   - [ ] Ensure certificate is valid for mobile browsers
   - [ ] Check certificate expiration date

2. **Check Next.js Config:**
   - [ ] Verify no insecure redirects
   - [ ] Check headers configuration
   - [ ] Ensure HTTPS is enforced

3. **Check Supabase URLs:**
   - [ ] All Supabase URLs use `https://`
   - [ ] No HTTP resources in the codebase

4. **Test Mobile:**
   - [ ] Clear browser cache on mobile
   - [ ] Try incognito/private mode
   - [ ] Check browser console for errors

---

## 📦 Current File Structure (Working)

```
web-gate/
├── app/
│   ├── components/
│   │   ├── ComingSoonLanding.tsx ✅
│   │   ├── WaitlistForm.tsx ✅
│   │   └── legal/
│   │       └── CookieBanner.tsx ✅
│   ├── verify/
│   │   ├── page.tsx ✅
│   │   └── VerifyContent.tsx ✅
│   ├── privacy-policy/
│   │   └── page.tsx ✅
│   ├── globals.css ✅
│   ├── layout.tsx ✅
│   └── page.tsx ✅
├── lib/
│   ├── supabase.ts ✅
│   └── waitlist.ts ✅
└── docs/
    └── (documentation)
```

---

## 🎯 Next Steps

1. ✅ Document current working state (this file)
2. ⏭️ Investigate mobile SSL issue
3. ⏭️ Fix mobile browser compatibility
4. ⏭️ Test thoroughly before any changes
5. ⏭️ Update this document after fixes

---

## 📞 If Something Breaks

1. **Revert to this backup:**
   ```bash
   git checkout backup-before-changes
   ```

2. **Check Supabase:**
   - Edge Function logs
   - Webhook status
   - Database connection

3. **Check Environment Variables:**
   - Verify all env vars are set
   - Check GitHub secrets (if using CI/CD)

4. **Test Email Flow:**
   - Submit test email
   - Check Supabase logs
   - Verify Resend dashboard

---

**Remember:** If it's working, don't fix it! Always test changes before pushing to GitHub.
