/**
 * Email Diagnostic Tool
 * 
 * Run: node diagnose-email.js
 * 
 * This will help identify why emails aren't being sent.
 */

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const FUNCTION_NAME = 'swift-action';

async function diagnose() {
  console.log('🔍 Email Diagnostic Tool\n');
  console.log('='.repeat(60));
  console.log('');

  // Check 1: Environment Variables
  console.log('📋 Check 1: Environment Variables');
  if (!SUPABASE_URL) {
    console.error('❌ SUPABASE_URL is not set');
    console.log('   Set it: $env:SUPABASE_URL="https://xxxxx.supabase.co"');
  } else {
    console.log('✅ SUPABASE_URL:', SUPABASE_URL);
  }

  if (!SUPABASE_ANON_KEY) {
    console.error('❌ SUPABASE_ANON_KEY is not set');
    console.log('   Set it: $env:SUPABASE_ANON_KEY="your_anon_key"');
  } else {
    console.log('✅ SUPABASE_ANON_KEY:', SUPABASE_ANON_KEY.substring(0, 20) + '...');
  }
  console.log('');

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.log('⚠️  Please set environment variables and run again.');
    return;
  }

  // Check 2: Test Edge Function Directly
  console.log('📋 Check 2: Testing Edge Function Directly');
  const FUNCTION_URL = `${SUPABASE_URL}/functions/v1/${FUNCTION_NAME}`;
  console.log('Function URL:', FUNCTION_URL);
  console.log('');

  const testPayload = {
    type: 'INSERT',
    table: 'waitlist',
    record: {
      email: 'moulimt@gmail.com',
      id: 'test-' + Date.now(),
      created_at: new Date().toISOString(),
    },
    old_record: null,
  };

  try {
    console.log('📤 Calling Edge Function directly...');
    const response = await fetch(FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(testPayload),
    });

    const responseText = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      responseData = { raw: responseText };
    }

    console.log('Response Status:', response.status);
    console.log('Response Data:', JSON.stringify(responseData, null, 2));
    console.log('');

    if (response.status === 404) {
      console.error('❌ Function not found!');
      console.log('   → The function "swift-action" may not be deployed');
      console.log('   → Deploy it in Supabase Dashboard → Edge Functions');
    } else if (response.status === 401 || response.status === 403) {
      console.error('❌ Authentication failed!');
      console.log('   → Check your SUPABASE_ANON_KEY is correct');
    } else if (response.status === 500) {
      console.error('❌ Server error!');
      console.log('   → Check Supabase Edge Function logs');
      console.log('   → Dashboard → Edge Functions → swift-action → Logs');
      if (responseData.error) {
        console.log('   → Error:', responseData.error);
      }
    } else if (response.ok) {
      console.log('✅ Function responded successfully!');
      if (responseData.success) {
        console.log('   → Email should be sent to: moulimt@gmail.com');
      } else if (responseData.error) {
        console.log('   → But returned error:', responseData.error);
      }
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
  }

  console.log('');
  console.log('='.repeat(60));
  console.log('');

  // Check 3: Test Database Insert
  console.log('📋 Check 3: Testing Database Insert (to trigger webhook)');
  console.log('');

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const testEmail = `test-${Date.now()}@example.com`;
    console.log('📤 Inserting test email:', testEmail);

    const { data, error } = await supabase
      .from('waitlist')
      .insert({ email: testEmail })
      .select();

    if (error) {
      console.error('❌ Database insert failed:', error.message);
    } else {
      console.log('✅ Database insert successful!');
      console.log('   Inserted:', data);
      console.log('');
      console.log('⏳ Now check:');
      console.log('   1. Supabase Dashboard → Edge Functions → swift-action → Logs');
      console.log('      Look for: "Webhook triggered!" or errors');
      console.log('   2. If NO logs appear: Webhook is not triggering');
      console.log('   3. If logs show errors: Share the error message');
    }
  } catch (error) {
    console.error('❌ Failed to test database:', error.message);
  }

  console.log('');
  console.log('='.repeat(60));
  console.log('');

  // Summary Checklist
  console.log('📋 Diagnostic Checklist:');
  console.log('');
  console.log('Please verify in Supabase Dashboard:');
  console.log('');
  console.log('□ RESEND_API_KEY secret is set correctly');
  console.log('   → Edge Functions → Settings → Secrets');
  console.log('   → Name should be exactly: RESEND_API_KEY');
  console.log('   → Value: re_cnb6ZQR1_EKyxixemg3KGans3SikWxZ5S');
  console.log('');
  console.log('□ swift-action function is deployed');
  console.log('   → Edge Functions → swift-action');
  console.log('   → Should show as active/deployed');
  console.log('');
  console.log('□ Webhook is configured');
  console.log('   → Database → Webhooks → send_welcome_email');
  console.log('   → Table: waitlist');
  console.log('   → Events: INSERT');
  console.log('   → Function: swift-action');
  console.log('   → Status: Enabled');
  console.log('');
  console.log('□ Check Edge Function logs');
  console.log('   → Edge Functions → swift-action → Logs');
  console.log('   → Insert an email, then check logs immediately');
  console.log('   → Look for errors or "Webhook triggered!"');
  console.log('');
  console.log('□ Resend domain verified');
  console.log('   → https://resend.com/domains');
  console.log('   → code2story.com should be verified');
  console.log('');
}

diagnose();
