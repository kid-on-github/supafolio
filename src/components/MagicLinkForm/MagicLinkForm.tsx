import { useState } from 'react'
import { supaClient } from '../../utils/supaClient'
import styles from './MagicLinkForm.module.css'

async function signInWithEmail(email: string) {
	console.log('email', email)
	const { data, error } = await supaClient.auth.signInWithOtp({
		email,
	})

	console.log('data', data)
	console.log('error', error)
	// TODO: handle error
}

const MagicLinkForm = () => {
	const [email, setEmail] = useState('')

	return (
		<div className={styles.MagicLinkForm}>
			<input
				type='email'
				placeholder='John@example.com'
				onChange={({ target: { value } }) => setEmail(value)}
			/>
			<button onClick={() => signInWithEmail(email)}>Send Magic Link</button>
		</div>
	)
}

export default MagicLinkForm
