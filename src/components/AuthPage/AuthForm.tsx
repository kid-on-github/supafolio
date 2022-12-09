import { FunctionComponent } from 'react'
import styles from './AuthForm.module.css'
import { useForm } from 'react-hook-form'
import { ActionType } from './AuthPage'
import { supaClient } from '../../utils/supaClient'

type FormValues = {
	email: string
	password: string
}
const auth = async (
	actionType: ActionType,
	email: string,
	password: string
) => {
	const authAction = actionType === 'sign_in' ? 'signInWithPassword' : 'signUp'

	const { data, error } = await supaClient.auth[authAction]({
		email,
		password,
	})

	return { data, error }
}

const AuthForm: FunctionComponent<{ actionType: ActionType }> = ({
	actionType,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>()

	const onSubmit = async ({ email, password }: FormValues) => {
		const { data, error } = await auth(actionType, email, password)
		// TODO: handle error
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.AuthForm}>
			<input
				{...register('email', { required: true })}
				type='email'
				placeholder='Email'
			/>

			{errors.email && <span>Email is required</span>}

			<input
				{...register('password', { required: true })}
				type='password'
				placeholder='Password'
			/>

			{errors.password && <span>Password is required</span>}

			<input
				type='submit'
				className={styles.ActionButton}
				placeholder={actionType === 'sign_in' ? 'Sign in' : 'Register'}
			/>
		</form>
	)
}

export default AuthForm
