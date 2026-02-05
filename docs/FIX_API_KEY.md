# 🔧 Fix: "API key is invalid" Error

## The Problem

The error shows:
```
"API key is invalid"
```

This means:
- ✅ Function is working (being triggered correctly)
- ✅ Email extraction works
- ✅ Resend API call is being made
- ❌ **API key is invalid or not being read**

## Solution Steps

### Step 1: Verify Secret is Set Correctly

1. Go to: **Supabase Dashboard → Edge Functions → Settings → Secrets**
2. Check if `RESEND_API_KEY` exists
3. **Verify the value** is exactly: `re_cnb6ZQR1_EKyxixemg3KGans3SikWxZ5S`
4. **Make sure there are NO extra spaces** before or after the key

### Step 2: Delete and Recreate the Secret (If Needed)

If the secret exists but still not working:

1. **Delete** the `RESEND_API_KEY` secret
2. **Create a new one**:
   - Name: `RESEND_API_KEY` (exactly, case-sensitive)
   - Value: `re_cnb6ZQR1_EKyxixemg3KGans3SikWxZ5S`
3. **Save**

### Step 3: Redeploy the Function

**CRITICAL**: After setting/updating the secret, you MUST redeploy the function:

1. Go to: **Edge Functions → swift-action**
2. Click **"Deploy"** or **"Redeploy"** button
3. This ensures the function picks up the new secret value

### Step 4: Verify API Key in Resend Dashboard

1. Go to: **https://resend.com/api-keys**
2. Check if the key `re_cnb6ZQR1_EKyxixemg3KGans3SikWxZ5S` exists
3. Make sure it's **active** (not revoked/disabled)
4. If it's not there or inactive, create a new API key

### Step 5: Test Again

After redeploying:

1. Insert a test email in the `waitlist` table
2. Check Edge Function logs
3. Should see: `"3. Resend API Response Status: 200"` (not 400)
4. Check your inbox: moulimt@gmail.com

## Common Causes

1. **Secret not set** → Set it in Edge Functions → Settings → Secrets
2. **Wrong secret name** → Must be exactly `RESEND_API_KEY`
3. **Function not redeployed** → Must redeploy after setting secret
4. **API key revoked** → Check Resend dashboard, create new key if needed
5. **Extra spaces** → Make sure no spaces in the secret value

## Quick Fix Checklist

- [ ] Secret `RESEND_API_KEY` exists in Supabase
- [ ] Secret value is exactly: `re_cnb6ZQR1_EKyxixemg3KGans3SikWxZ5S`
- [ ] No extra spaces in secret name or value
- [ ] Function `swift-action` is redeployed after setting secret
- [ ] API key is active in Resend dashboard
- [ ] Test email inserted and logs checked

## If Still Not Working

If after all steps it still shows "API key is invalid":

1. **Create a NEW API key** in Resend:
   - Go to: https://resend.com/api-keys
   - Click "Create API Key"
   - Copy the new key
   
2. **Update the secret** in Supabase with the new key

3. **Redeploy** the function

4. **Test again**

The most common issue is **not redeploying the function** after setting/updating the secret!
