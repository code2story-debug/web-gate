# 🔍 Email Not Sending - Diagnostic Checklist

Since you corrected the RESEND_API_KEY name, let's check what else might be wrong.

## Critical Checks

### 1. ✅ Secret Name is Correct
- **Location**: Supabase Dashboard → Edge Functions → Settings → Secrets
- **Name must be exactly**: `RESEND_API_KEY` (case-sensitive, no spaces)
- **Value**: `re_cnb6ZQR1_EKyxixemg3KGans3SikWxZ5S`
- **After changing**: Redeploy the function so it picks up the new secret

### 2. ✅ Function Code Handles Payload Correctly

Your function code should extract the full payload:

```typescript
const payload = await req.json();
const { record, table, type } = payload;  // ✅ Correct

// NOT:
const { record } = await req.json();  // ❌ Wrong
```

**Check**: Go to Edge Functions → swift-action → View Code
- Does it extract `{ record, table, type }`?
- Or does it only extract `{ record }`?

### 3. ✅ Function is Deployed

- **Location**: Supabase Dashboard → Edge Functions
- **Check**: Is `swift-action` listed and active?
- **If not**: Deploy it with the correct code

### 4. ✅ Webhook is Configured Correctly

- **Location**: Database → Webhooks → send_welcome_email
- **Check**:
  - Table: `waitlist` ✅
  - Events: `INSERT` ✅
  - Function: `swift-action` ✅
  - Status: **Enabled** ✅

### 5. ✅ Check Function Logs

**Most Important**: Check the logs when you insert an email:

1. Go to: **Edge Functions → swift-action → Logs**
2. Insert a test email in the `waitlist` table
3. **Immediately** check the logs
4. **What do you see?**
   - ✅ "Webhook triggered!" → Function is being called
   - ✅ "Sending email to: ..." → Function is processing
   - ❌ "RESEND_API_KEY environment variable is not set!" → Secret not found
   - ❌ "No record found in webhook payload!" → Payload format issue
   - ❌ "Resend API error: ..." → Resend issue
   - ❌ No logs at all → Webhook not triggering

## Run Diagnostic Script

I've created a diagnostic script. Run it:

```powershell
cd c:\Users\MOULIM\Contacts\Desktop\code2story-empire\web-gate

# Set your Supabase credentials
$env:SUPABASE_URL="https://pghgwjllysqxhptbhqei.supabase.co"
$env:SUPABASE_ANON_KEY="your_anon_key_here"

node diagnose-email.js
```

This will test:
- ✅ Function accessibility
- ✅ Function response
- ✅ Database insert
- ✅ Webhook trigger

## Most Common Issues After Fixing Secret Name

### Issue 1: Function Not Redeployed
**Problem**: After changing the secret name, the function needs to be redeployed to pick it up.

**Fix**: 
1. Go to Edge Functions → swift-action
2. Click "Deploy" or "Redeploy"
3. This ensures it reads the updated secret

### Issue 2: Wrong Payload Extraction
**Problem**: Function code only extracts `{ record }` instead of full payload.

**Fix**: Update function code to extract `{ record, table, type }`

### Issue 3: Webhook Not Triggering
**Problem**: Webhook exists but doesn't trigger the function.

**Fix**: 
- Verify webhook is enabled
- Check webhook URL/function name matches
- Test by inserting email and checking logs immediately

## What to Share

After running diagnostics, please share:

1. **Edge Function Logs** - What appears when you insert an email?
2. **Function Code** - Does it extract `{ record, table, type }`?
3. **Secret Status** - Is `RESEND_API_KEY` listed in secrets?
4. **Diagnostic Output** - What does `diagnose-email.js` show?

This will help identify the exact issue!
