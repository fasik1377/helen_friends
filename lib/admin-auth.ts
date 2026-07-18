export const adminSessionKey = "helen-friends-admin-session";

const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin";
const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "Helen@2026";

export function authenticateAdmin(username: string, password: string) {
  const isValid = username.trim() === adminUsername && password === adminPassword;

  if (isValid) {
    window.sessionStorage.setItem(adminSessionKey, "authenticated");
  }

  return isValid;
}

export function isAdminAuthenticated() {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(adminSessionKey) === "authenticated";
}

export function logoutAdmin() {
  window.sessionStorage.removeItem(adminSessionKey);
}
