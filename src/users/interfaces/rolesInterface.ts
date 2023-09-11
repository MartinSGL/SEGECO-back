export const roles = {
  super: 'super',
  admin: 'admin',
  operador: 'operador',
} as const;

export type Roles = (typeof roles)[keyof typeof roles];
