import React from 'react'
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import ForgotPassword from './Components/ForgotPassword'
import ResetPassword from './Components/ResetPassword'

const App: React.FC = () => {
	return (
		<div>
			<Router>
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/forgotpassword" component={ForgotPassword} />
					<Route exact path="/resetpassword/:token" component={ResetPassword} />
					<Redirect from="/" to="/login" />
				</Switch>
			</Router>
		</div>
	)
}

export default App
