import './App.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { UserInfo, useSession } from './utils/useSession'
import { createContext } from 'react'
import Home from './components/Home/Home'
import { Page } from './components/Page/Page'
import ProfileEdit from './components/Profile/ProfileEdit/ProfileEdit'
import ProfilePreview from './components/Profile/ProfilePreview/ProfilePreview'

export const UserContext = createContext<UserInfo>({
	session: null,
})

const UserInfoProvider = () => {
	const userInfo = useSession()
	console.log(userInfo)

	return (
		<UserContext.Provider value={userInfo}>
			<Outlet />
		</UserContext.Provider>
	)
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <UserInfoProvider />,
		children: [
			{
				path: '',
				element: <Home />,
			},
			{
				path: 'profile',
				element: (
					<Page>
						<Outlet />
					</Page>
				),
				children: [
					{
						path: '',
						element: <ProfileEdit />,
					},
					{
						path: ':id',
						element: <ProfilePreview />,
					},
				],
			},
		],
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App
