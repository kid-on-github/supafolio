import { Navigate, redirect } from 'react-router-dom'
import { supaClient } from '../../utils/supaClient'
import styles from './Welcome.module.css'
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import { UserContext } from '../../App'

export const welcomeLoader = async () => {
	const {
		data: { user },
	} = await supaClient.auth.getUser()

	if (!user) {
		return redirect('/auth')
	}

	const { data } = await supaClient
		.from('user_profiles')
		.select('*')
		.eq('user_id', user?.id)
		.single()

	if (data?.username) {
		console.log('username', data?.username)
		return redirect('/events')
	}
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

	return saveSuccessful ? (
		<Navigate to='/events' />
	) : (
		<div className={styles.Welcome}>
			<h1>Welcome to supatest!</h1>
			<p>Start editing to see some magic happen!</p>

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
