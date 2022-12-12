import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../../App'
import MagicLinkForm from '../MagicLinkForm/MagicLinkForm'
import { Page } from '../Page/Page'
import styles from './Home.module.css'

const Home = () => {
	// TODO: figure out a better auth redirect solution
	const user = useContext(UserContext)
	const { id } = user.session?.user ?? {}

	if (id) {
		return <Navigate to='/profile' />
	}

	return (
		<Page>
			<div className={styles.Home}>
				<h1>Smart Business Cards in Seconds</h1>
				<p>Give it a try</p>
				<MagicLinkForm />
			</div>
		</Page>
	)
}

export default Home
