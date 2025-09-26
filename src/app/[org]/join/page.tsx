import { RegistrationForm } from "@/components/registration-form";
import { supabase } from "@/lib/supabaseClient";

interface JoinPageProps {
  params: { org: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function JoinPage({ params }: JoinPageProps) {
  const { org } = await params;

  const { data: staffs, error: staffError } = await supabase
    .from("staff")
    .select("*")
    .eq("organization_code", org)
    .order("name", { ascending: true });

  const { data: purposes, error: purposeError } = await supabase
    .from("purpose")
    .select("*")
    .eq("organization_code", org)
    .order("purpose", { ascending: true });

  if (staffError) {
    return <div>No staffs set</div>;
  }

  if (purposeError) {
    return <div>No purpose set</div>;
  }

  return <RegistrationForm org={org} staffs={staffs} purposes={purposes} />;
}
