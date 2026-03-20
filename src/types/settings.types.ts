export interface ProfileSettings {
	name: string
	email: string
}

export interface PasswordSettings {
	current_password: string
	password: string
	password_confirmation: string
}

export interface DeleteAccountPayload {
	current_password: string
}