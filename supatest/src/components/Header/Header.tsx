import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../App'
import styles from './Header.module.css'
import { supaClient } from '../../utils/supaClient'

export const Header = () => {
	const signOut = async () => {
		const { error } = await supaClient.auth.signOut()
		// TODO: handle error
	}

	const {profile} = useContext(UserContext)

	console.log('profile', profile)

	const { user = null } = useContext(UserContext)?.session ?? {}

	return (
		<div className={styles.Header}>
			<div className={styles.HeaderContent}>
				<Link to={'/'} className={styles.Logo}>
					<h1>logo</h1>
				</Link>

				{user ? (
					<button className={styles.AuthButton} onClick={signOut}>
						Sign Out
					</button>
				) : (
					<Link to={'/auth'} className={styles.AuthButton}>
						Sign In
					</Link>
				)}
			</div>
		</div>
	)
}
