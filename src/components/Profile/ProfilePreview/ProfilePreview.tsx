import { FunctionComponent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Icon from '../icons/Icons'
import styles from '../Profile.module.css'
import QrCode from '../QrCode/QrCode'
import { getProfileInfo } from '../utils'
import { baseURL } from '../utils'

// TODO: update type and improve this function
const buildVCard = (data: any, previewLink: string) => {
	const {
		full_name,
		title,
		email,
		cell,
		company,
		company_website,
		linkedin,
		twitter,
		instagram,
		facebook,
	} = data

	let vCard = `BEGIN:VCARD\nVERSION:3.0\n`

	full_name && (vCard += `N:${full_name}\n`)
	title && (vCard += `TITLE:${title}\n`)
	email && (vCard += `EMAIL:${email}\n`)
	cell && (vCard += `TEL;TYPE=CELL:${cell}\n`)
	company && (vCard += `ORG:${company}\n`)
	company_website && (vCard += `URL;type=WORK:${company_website}\n`)
	// linkedin && (vCard += `X-SOCIALPROFILE;TYPE=linkedin:${linkedin}\n`)
	// twitter && (vCard += `X-SOCIALPROFILE;TYPE=twitter:${twitter}\n`)
	// instagram && (vCard += `X-SOCIALPROFILE;TYPE=instagram:${instagram}\n`)
	// facebook && (vCard += `X-SOCIALPROFILE;TYPE=facebook:${facebook}\n`)
	vCard += `URL:${previewLink}\n`
	vCard += `END:VCARD`

	return 'data:text/plain;charset=utf-8,' + encodeURIComponent(vCard)
}

const ProfilePreview = () => {
	const { id = '' } = useParams()

	const [dataToRender, setDataToRender] = useState({
		full_name: '',
		title: '',
		email: '',
		cell: '',
		company: '',
		company_website: '',
		linkedin: '',
		instagram: '',
		facebook: '',
		twitter: '',
	})

	useEffect(() => {
		const getDataToRender = async () => {
			const dataToRender = (await getProfileInfo(id)) ?? {}
			setDataToRender((oldData) => ({ ...oldData, ...dataToRender }))
		}
		getDataToRender()
	}, [id])

	const {
		full_name,
		title,
		email,
		cell,
		company,
		company_website,
		linkedin,
		instagram,
		facebook,
		twitter,
	} = dataToRender

	const previewLink = `${baseURL}/profile/${id}`

	return (
		<div className={styles.FlexSpacing}>
			<QrCode url={previewLink} />

			<div className={styles.ContactInfo}>
				{full_name && <h3>{full_name}</h3>}

				<ConditionalText text={title} />

				{company && company_website ? (
					<ConditionalLink label={company} url={company_website} />
				) : (
					<ConditionalText text={company} />
				)}
			</div>

			<div className={styles.IconGrid}>
				<ConditionalIconLink icon='mail' url={email && `mailto:${email}`} />
				<ConditionalIconLink icon='call' url={cell && `tel:${cell}`} />
				<ConditionalIconLink icon='linkedin' url={linkedin} />
				<ConditionalIconLink icon='instagram' url={instagram} />
				<ConditionalIconLink icon='facebook' url={facebook} />
				<ConditionalIconLink icon='twitter' url={twitter} />
			</div>
			<a download={`${full_name.split(' ').join('-') ?? 'contact'}.vcf`} href={buildVCard(dataToRender, previewLink)}>
				Save Contact
			</a>
		</div>
	)
}

const ConditionalText: FunctionComponent<{ text?: string }> = ({ text }) =>
	text ? <p>{text}</p> : null

const ConditionalLink: FunctionComponent<{ label: string; url?: string }> = ({
	label,
	url,
}) => (url ? <a href={url}>{label}</a> : null)

const ConditionalIconLink: FunctionComponent<{
	icon: string
	url?: string
}> = ({ icon, url }) =>
	url ? (
		<a href={url}>
			<div className={styles.IconLink}>
				<Icon {...{ icon }} />
			</div>
		</a>
	) : null

export default ProfilePreview
