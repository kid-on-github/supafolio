import { supaClient } from '../../utils/supaClient'
import styles from './Profile.module.css'
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
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

	return (
		<Page>
			<div className={styles.Page}>
				<QrCode url='http://localhost.com/profile' />
				{saveSuccessful && <p>successful save</p>}

				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register('full_name', { required: true })}
						type='text'
						placeholder='Name'
					/>

					<input type='submit' />
				</form>
			</div>
		</Page>
	)
}
