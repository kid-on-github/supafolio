import { useContext } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import { UserContext } from '../../App'
import { Page } from '../Page/Page'
import styles from './Profile.module.css'

const Profile = () => {
	return (
		<Page>
			<PreviewEdit />
			<Outlet />
		</Page>
	)
}

const PreviewEdit = () => {
	const user = useContext(UserContext)
	const { id } = user.session?.user ?? {}
	const { id: paramId = '' } = useParams()
	const icon = id === paramId ? 'edit' : 'visibility'
	const link = paramId ? `/profile` : `/profile/${id}`

	return id ? (
		<Link to={link}>
			<div className={styles.PreviewEdit}>
				<span className='material-symbols-outlined'>{icon}</span>
			</div>
		</Link>
	) : null
}

export default Profile
