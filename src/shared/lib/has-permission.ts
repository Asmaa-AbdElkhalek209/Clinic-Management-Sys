export function hasPermission(
  role: string | undefined,
  allowedRoles: readonly string[]
) {
  return !!role && allowedRoles.includes(role);
}
