import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function signInStaff(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  // Check if user is staff
  const { data: staffData, error: staffError } = await supabase
    .from("staff")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (staffError || !staffData) {
    await supabase.auth.signOut();
    throw new Error("Not authorized as staff");
  }

  return { user: data.user, staff: staffData };
}

export async function registerStaff(
  email: string,
  password: string,
  staffData: {
    username: string;
    role?: string;
    department?: string;
  }
) {
  // First, create the auth user
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  if (!data.user) {
    throw new Error("Failed to create user");
  }

  // Then create the staff record
  const { data: newStaff, error: staffError } = await supabase
    .from("staff")
    .insert({
      id: data.user.id,
      username: staffData.username,
      role: staffData.role || "staff",
      department: staffData.department,
    })
    .select()
    .single();

  if (staffError) {
    // If staff creation fails, clean up the auth user
    await supabase.auth.admin.deleteUser(data.user.id);
    throw new Error("Failed to create staff record: " + staffError.message);
  }

  return { user: data.user, staff: newStaff };
}

// Check if current user can register other staff (admin only)
export async function canRegisterStaff(): Promise<boolean> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data: staff } = await supabase
    .from("staff")
    .select("role")
    .eq("id", user.id)
    .single();

  return staff?.role === "admin" || staff?.role === "super_admin";
}
