import { FunctionComponent } from 'react'
import styles from './Page.module.css'

export const Page: FunctionComponent<{
	children: JSX.Element | JSX.Element[]
}> = ({ children }) => {
	return (
		<div className={styles.Page}>
			<div className={styles.PageContentWrapper}>
				<div className={styles.PageContent}>{children}</div>
			</div>
		</div>
	)
}
