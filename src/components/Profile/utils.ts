import { supaClient } from '../../utils/supaClient'

export const baseURL = (import.meta as any).env.VITE_BASE_URL

export const getProfileInfo = async (id: string) => {
	const { data } = await supaClient
		.from('user_profiles')
		.select('*')
		.filter('user_id', 'eq', id)
	return data?.[0] ?? null
}
