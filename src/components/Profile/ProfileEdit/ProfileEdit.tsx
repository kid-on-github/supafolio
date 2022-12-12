import { useContext } from 'react'
import { UserContext } from '../../../App'
import { supaClient } from '../../../utils/supaClient'
import styles from '../Profile.module.css'
import QrCode from '../QrCode/QrCode'
import { baseURL } from '../utils'
import ProfileForm from './ProfileForm'

const signOut = async () => {
	const { error } = await supaClient.auth.signOut()
	// TODO: handle error
}

const ProfileEdit = () => {
	const user = useContext(UserContext)
	const { id } = user.session?.user ?? {}

	const previewLink = `${baseURL}/profile/${id}`

	return id ? (
		<div className={styles.FlexSpacing}>
			<QrCode url={previewLink} />
			<ProfileForm />
			<hr />
			<button className={styles.LogOut} onClick={() => signOut()}>
				Log Out
			</button>
		</div>
	) : null
}

export default ProfileEdit
