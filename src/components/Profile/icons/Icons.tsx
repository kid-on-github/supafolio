import { FunctionComponent } from 'react'
import linkedin from './linkedin.svg'
import twitter from './twitter.svg'
import instagram from './instagram.svg'
import facebook from './facebook.svg'
import call from './call.svg'
import mail from './mail.svg'

const icons: Record<string, any> = {
	linkedin,
	twitter,
	instagram,
	facebook,
	call,
	mail,
}

const Icon: FunctionComponent<{ icon: string }> = ({ icon }) => {
	return icon in icons ? <img src={icons[icon]} /> : null
}

export default Icon
