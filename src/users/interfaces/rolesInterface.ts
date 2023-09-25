export const roles = {
  super: 'super',
  admin: 'admin',
  operator: 'operator',
} as const;

export type Roles = (typeof roles)[keyof typeof roles];
