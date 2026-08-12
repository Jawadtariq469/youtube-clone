export interface AuthUser {
  id: string;
  name: string;
  email: string | null;
  avatarUrl: string | null;
}

export interface AuthState {
  user: AuthUser | null;

  isLoading: boolean;
  isInitialized: boolean;

  error: string | null;
}
