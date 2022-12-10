import { supaClient } from '../../utils/supaClient'
import styles from './Profile.module.css'

import { Page } from '../Page/Page'
import QrCode from './QrCode'
import ProfileForm from './ProfileForm'

const signOut = async () => {
	const { error } = await supaClient.auth.signOut()
	// TODO: handle error
}

export const Profile = () => {
	return (
		<Page>
			<div className={styles.FlexSpacing}>
				<QrCode url='http://localhost.com/profile' />
				<ProfileForm />
				<hr />
				<button className={styles.LogOut} onClick={() => signOut()}>
					Log Out
				</button>
			</div>
		</Page>
	)
}
