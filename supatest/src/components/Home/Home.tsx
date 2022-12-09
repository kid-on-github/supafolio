import { Page } from '../Page/Page'
import styles from './Home.module.css'

export const Home = () => {
	return (
		<Page>
			<div className={styles.WelcomeWrapper}>
				<h1 className={styles.LargeText}>Welcome</h1>
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
					impedit aliquid asperiores, nesciunt velit consequatur dolorem ratione
					deleniti ut dolor dolore quod soluta cum debitis obcaecati temporibus
					explicabo, qui amet?
				</p>
			</div>
		</Page>
	)
}
