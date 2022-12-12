import MagicLinkForm from '../MagicLinkForm/MagicLinkForm'
import { Page } from '../Page/Page'
import styles from './Home.module.css'

const Home = () => {
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
