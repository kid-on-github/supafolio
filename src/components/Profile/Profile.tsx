import { supaClient } from '../../utils/supaClient'
import styles from './Profile.module.css'
import { useForm } from 'react-hook-form'
import { FunctionComponent, useContext, useState } from 'react'
import { UserContext } from '../../App'
import { Page } from '../Page/Page'
import QrCode from './QrCode'

const signOut = async () => {
	const { error } = await supaClient.auth.signOut()
	// TODO: handle error
}

type FormValues = {
	full_name: string
}

type RegisterKey = 'full_name'

export const Profile = () => {
	const user = useContext(UserContext)
	const [saveSuccessful, setSaveSuccessful] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>()

	const onSubmit = ({ full_name }: FormValues) => {
		console.log(full_name)

		supaClient
			.from('user_profiles')
			.insert([
				{
					user_id: user.session?.user?.id ?? '',
					full_name,
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

	const InputItem: FunctionComponent<{
		label: string
		registerKey: RegisterKey
		type: string
		placeholder: string
	}> = ({ label, registerKey, type, placeholder }) => {
		return (
			<label>
				<span className={styles.LabelText}>{label}</span>
				<input
					{...register(registerKey)}
					type={type}
					placeholder={placeholder}
				/>
			</label>
		)
	}

	return (
		<Page>
			<div className={styles.FlexSpacing}>
				<QrCode url='http://localhost.com/profile' />
				{saveSuccessful && <p>successful save</p>}

				<form onSubmit={handleSubmit(onSubmit)} className={styles.FlexSpacing}>
					<InputItem
						label='Name'
						registerKey='full_name'
						type='text'
						placeholder='Name'
					/>

					<input type='submit' value='save'/>
				</form>
			</div>
		</Page>
	)
}
