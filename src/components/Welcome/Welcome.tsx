import { Navigate, redirect } from 'react-router-dom'
import { supaClient } from '../../utils/supaClient'
import styles from './Welcome.module.css'
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { UserContext } from '../../App'

const signOut = async () => {
	const { error } = await supaClient.auth.signOut()
	// TODO: handle error
}


type FormValues = {
	username: string
}

export const Welcome = () => {
	const user = useContext(UserContext)
	const [saveSuccessful, setSaveSuccessful] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>()

	const onSubmit = ({ username }: FormValues) => {
		console.log(username)

		supaClient
			.from('user_profiles')
			.insert([
				{
					user_id: user.session?.user?.id ?? '',
					username,
				},
			])
			.then(({ error }) => {
				console.log('test', error)
				if (error) {
					console.log(error)
				} else {
					setSaveSuccessful(true)
				}
			})
	}

	return (
		<div className={styles.Welcome}>
			<h1>QR</h1>
			{saveSuccessful && (<p>successful save</p>)}

			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register('username', { required: true })}
					type='text'
					placeholder='Username'
				/>

				<input type='submit' />
			</form>
		</div>
	)
}
