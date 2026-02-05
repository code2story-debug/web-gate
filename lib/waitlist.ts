import { supabase } from "./supabase";

export interface WaitlistEntry {
  email: string;
  verification_token?: string;
  verified?: boolean;
  verified_at?: string;
}

/**
 * Add email to waitlist (unverified - requires double opt-in)
 */
export async function addToWaitlist(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim().toLowerCase())) {
      return { success: false, error: "Invalid email address" };
    }

    const cleanEmail = email.trim().toLowerCase();
    const verificationToken = crypto.randomUUID();

    const { error } = await supabase
      .from("waitlist")
      .insert({
        email: cleanEmail,
        verification_token: verificationToken,
        verified: false,
      });

    if (error) {
      if (error.code === "23505") {
        return { success: false, error: "Email already registered" };
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
}

/**
 * Verify email with token (double opt-in)
 */
export async function verifyWaitlistEmail(
  token: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await supabase
      .from("waitlist")
      .update({
        verified: true,
        verified_at: new Date().toISOString(),
      })
      .eq("verification_token", token)
      .eq("verified", false)
      .select();

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data || data.length === 0) {
      return { success: false, error: "Invalid or expired verification token" };
    }

    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    };
  }
}
