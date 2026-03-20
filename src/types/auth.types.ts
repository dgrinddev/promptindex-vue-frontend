export interface RegisterPayload {
	name: string
	email: string
	password: string
	password_confirmation: string
	accept_terms: boolean
}

export interface LoginPayload {
	email: string
	password: string
}

export interface AuthUser {
  name: string
  created_at: string
}