import { useEffect, useState } from 'react'
import { supaClient } from '../../utils/supaClient'
import styles from './MagicLinkForm.module.css'

async function signInWithEmail(email: string) {
	const { data, error } = await supaClient.auth.signInWithOtp({
		email,
	})
	console.log('data', data)
	console.log('error', error)
	// TODO: handle error
}

const MagicLinkForm = () => {
	const [email, setEmail] = useState('')
	const [clicked, setClicked] = useState(false)

	const updateClicked = () => setClicked(true)

	useEffect(() => {
		if (clicked) {
			setTimeout(() => {
				setClicked(false)
			}, 10000)
		}
	}, [clicked])

	return (
		<>
			<div className={styles.MagicLinkForm}>
				<input
					type='email'
					placeholder='John@example.com'
					onChange={({ target: { value } }) => setEmail(value)}
				/>
				<button onClick={() => signInWithEmail(email).then(updateClicked)}>
					<span className='material-symbols-outlined'>send</span>
				</button>
			</div>
			{clicked && (
				<div className={styles.EmailSentMsg}>
					<h4>Click the link in your email to log in!</h4>
				</div>
			)}
		</>
	)
}

export default MagicLinkForm
