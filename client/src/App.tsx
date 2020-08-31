import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard'
import ForgotPassword from './Components/ForgotPassword'
import Login from './Components/Login'
import Register from './Components/Register'
import ResetPassword from './Components/ResetPassword'

interface IData {
	full: string
	short: string
	created: Date
	_id: string
	__v: number
}

const App: React.FC = () => {
	const [urlData, setUrlData] = useState<IData[]>([])

	useEffect(() => {
		axios
			.get('/api/url/allurls')
			.then(res => {
				setUrlData(res.data)
			})
			.catch(err => alert(err))
	}, [])
	return (
		<>
			<Switch>
				<Route
					exact
					path="/url/:shorturl"
					render={props => {
						if (urlData !== null) {
							const shorturl = props.match.params.shorturl
							const fullURL = urlData.filter(val => val.short === shorturl)[0]
							if (fullURL) window.location.href = 'https://' + fullURL.full
						}
						return null
					}}
				/>
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/forgotpassword" component={ForgotPassword} />
				<Route exact path="/resetpassword/:token" component={ResetPassword} />
				<Route exact path="/dashboard/:tab" component={Dashboard} />
				<Redirect exact from="/" to="/login" />
				<Redirect exact from="/dashboard" to="/dashboard/home" />
			</Switch>
		</>
	)
}

export default App
