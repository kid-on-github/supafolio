import { useForm } from 'react-hook-form'
import { FunctionComponent, useContext, useState } from 'react'
import { supaClient } from '../../utils/supaClient'
import { UserContext } from '../../App'
import styles from './Profile.module.css'

type FormValues = Record<RegisterKey, string>

type RegisterKey =
	| 'full_name'
	| 'email'
	| 'cell'
	| 'company'
	| 'company_website'
	| 'linkedin'
	| 'instagram'
	| 'facebook'
	| 'twitter'

const ProfileForm = () => {
	const user = useContext(UserContext)
	const [saveSuccessful, setSaveSuccessful] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>()

	const onSubmit = (values: FormValues) => {

		const { id } = user.session?.user ?? {}
        console.log('id', id)

		if (id) {
			supaClient
				.from('user_profiles')
				.insert([
					{
						user_id: id,
						...values
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
	}

	const InputItem: FunctionComponent<{
		label: string
		registerKey: RegisterKey
		type: string
	}> = ({ label, registerKey, type }) => {
		return (
			<label>
				<span className={styles.LabelText}>{label}</span>
				<input {...register(registerKey)} type={type} />
			</label>
		)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.FlexSpacing}>
			<InputItem label='Name' registerKey='full_name' type='text' />
			<InputItem label='Email' registerKey='email' type='text' />
			<InputItem label='Cell' registerKey='cell' type='text' />
			<InputItem label='Company' registerKey='company' type='text' />
			<InputItem
				label='Company Website'
				registerKey='company_website'
				type='text'
			/>
			<InputItem label='Linkedin' registerKey='linkedin' type='text' />
			<InputItem label='Instagram' registerKey='instagram' type='text' />
			<InputItem label='Facebook' registerKey='facebook' type='text' />
			<InputItem label='Twitter' registerKey='twitter' type='text' />
			<input type='submit' value='save' />
		</form>
	)
}

export default ProfileForm