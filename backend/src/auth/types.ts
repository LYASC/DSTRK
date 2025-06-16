export interface UtilisateurPayload {
  id: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}
