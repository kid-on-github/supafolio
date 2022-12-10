import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { supaClient } from './supaClient'

export interface UserProfile {
	full_name: string
	avatar_url?: string
}

export interface UserInfo {
	session: Session | null
}

export function useSession(): UserInfo {
	const [userInfo, setUserInfo] = useState<UserInfo>({
		session: null,
	})

	useEffect(() => {
		supaClient.auth.getSession().then(({ data: { session } }) => {
			setUserInfo({ ...userInfo, session })
			supaClient.auth.onAuthStateChange((_event, session) => {
				setUserInfo({ session })
			})
		})
	}, [])

	return userInfo
}
