# 📬 Quick Guide: Receive Emails at hello@code2story.com

## What You Need

You want emails sent TO `hello@code2story.com` to arrive in your inbox.

## Best Solution: Email Forwarding

### Step 1: Check Where Your Domain DNS is Managed

Where did you set up DNS for `code2story.com`?
- Cloudflare?
- Namecheap?
- GoDaddy?
- Google Domains?
- Other?

### Step 2: Set Up Email Forwarding

**If using Cloudflare** (Recommended - Free):
1. Go to: Cloudflare Dashboard → Email → Email Routing
2. Enable Email Routing
3. Add route: `hello@code2story.com` → `moulimt@gmail.com`
4. Done!

**If using other providers**:
1. Go to your domain/DNS management panel
2. Look for "Email Forwarding" or "Mail Forwarding"
3. Create forward: `hello@code2story.com` → `moulimt@gmail.com`

### Step 3: Test

Send a test email to `hello@code2story.com` and check `moulimt@gmail.com`.

## Alternative: Professional Email Service

If you want a full mailbox (not just forwarding):

1. **Google Workspace** (~$6/month):
   - Create `hello@code2story.com` mailbox
   - Access via Gmail or forward to personal Gmail

2. **Zoho Mail** (Free tier available):
   - Free email hosting
   - Can forward to Gmail

## About the Corrupted Email Address

The email `moulimt+caf_=code2story=gmail.com@gmail.com` looks corrupted.

**Fix**: The updated function code now includes:
- Email validation
- Email cleaning (trim, lowercase)
- Format checking

Update your `swift-action` function with the code from `AUTO_RESPONDER_CODE.txt` to prevent this.

## Summary

1. ✅ **Update function** with auto-responder code (fixes email validation)
2. ✅ **Set up email forwarding** for `hello@code2story.com`
3. ✅ **Test** both sending and receiving emails

Need help with a specific provider? Let me know!
