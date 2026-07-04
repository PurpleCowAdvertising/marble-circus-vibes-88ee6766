// Server-only helper: is this signed-in email an admin?
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const raw = process.env.ADMIN_EMAILS ?? "";
  const allowed = raw
    .split(/[,\s]+/)
    .map((v) => v.trim().toLowerCase())
    .filter(Boolean);
  return allowed.includes(email.toLowerCase());
}
