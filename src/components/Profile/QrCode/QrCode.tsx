import QRCodeStyling from 'qr-code-styling'
import styles from './QrCode.module.css'
import { FunctionComponent, useEffect, useRef } from 'react'

const QrCode: FunctionComponent<{ url: string }> = ({ url = '' }) => {
	const qrCode = new QRCodeStyling({
		width: 240,
		height: 240,
		dotsOptions: {
			color: '#181818',
			type: 'rounded',
		},
		data: url,
	})

	const ref = useRef(null)

	useEffect(() => {
		qrCode.append(ref.current ?? undefined)
	}, [])

	return <div className={styles.QrCode} ref={ref} />
}

export default QrCode
