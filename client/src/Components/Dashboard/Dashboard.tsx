import { AppBar, CssBaseline, Tab, Tabs } from '@material-ui/core'
import React from 'react'
import {
	Route,
	Switch,
	useParams,
	useRouteMatch,
	useHistory,
} from 'react-router-dom'
import AllURLs from './AllURLs'
import Home from './Home'
import Stats from './Stats'

const Dashboard: React.FC = () => {
	const { tab } = useParams()
	const match = useRouteMatch()
	const history = useHistory()

	const tabToIndex: { [key: string]: number } = {
		home: 0,
		allurls: 1,
		stats: 2,
	}

	const indexToTab: { [key: number]: string } = {
		0: 'home',
		1: 'allurls',
		2: 'stats',
	}
	const [tabIndex, setTabIndex] = React.useState<number>(tabToIndex[tab])

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setTabIndex(newValue)
		history.push(indexToTab[newValue])
	}
	return (
		<>
			<CssBaseline />
			<AppBar position="static">
				<Tabs value={tabIndex} onChange={handleChange} centered>
					<Tab label="Home" />
					<Tab label="All URLs" />
					<Tab label="Stats" />
				</Tabs>
			</AppBar>
			<Switch>
				<Route exact path={`/dashboard/stats`} component={Stats} />
				<Route exact path={`/dashboard/home`} component={Home} />
				<Route exact path={`/dashboard/allurls`} component={AllURLs} />
			</Switch>
		</>
	)
}

export default Dashboard
