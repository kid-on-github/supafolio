import { useContext, useState } from 'react'
import { supaClient } from '../../utils/supaClient'
import { Page } from '../Page/Page'
import styles from './AuthPage.module.css'
import type { Provider } from '@supabase/gotrue-js'
import AuthForm from './AuthForm'
import { UserContext } from '../../App'
import { Navigate } from 'react-router-dom'

const socialLogin = async (provider: Provider) => {
	const { data, error } = await supaClient.auth.signInWithOAuth({
		provider,
	})
	// TODO: handle error
}

export type ActionType = 'sign_in' | 'sign_up'

export const AuthPage = () => {
	const { user = null } = useContext(UserContext)?.session ?? {}
	const [actionType, setActionType] = useState<ActionType>('sign_in')

	const toggleActionType = () => {
		setActionType(actionType === 'sign_in' ? 'sign_up' : 'sign_in')
	}

	return user ? (
		<Navigate to={'/events'} />
	) : (
		<Page>
			<div className={styles.AuthPage}>
				<div className={styles.AuthCard}>
					<h1>{actionType === 'sign_in' ? 'Sign in' : 'Register'}</h1>

					<AuthForm actionType={actionType} />

					<button className={styles.AuthToggle} onClick={toggleActionType}>
						{actionType === 'sign_in' ? 'Create an Account' : 'Sign in'}
					</button>

					<span className={styles.Or}>
						<hr />
						<p>or</p>
						<hr />
					</span>

					<button
						className={styles.GoogleAuth}
						onClick={() => socialLogin('google')}
					>
						Sign in with Google
					</button>
				</div>
			</div>
		</Page>
	)
}
