import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import axios from 'axios'
import { differenceInCalendarWeeks, differenceInMonths } from 'date-fns'
import React, { useEffect, useState } from 'react'

interface IData {
	full: string
	short: string
	created: Date
	_id: string
	__v: number
}

const Stats: React.FC = () => {
	const [weeklyCount, setWeeklyCount] = useState<number>(0)
	const [monthlyCount, setMonthlyCount] = useState<number>(0)

	useEffect(() => {
		axios
			.get('/api/url/allurls')
			.then(res => {
				res.data.forEach((val: IData) => {
					if (differenceInCalendarWeeks(val.created, Date.now()) === 0) {
						setWeeklyCount(c => c + 1)
					}
					if (differenceInMonths(val.created, Date.now()) === 0) {
						setMonthlyCount(c => c + 1)
					}
				})
			})
			.catch(err => alert(err))
	}, [])

	return (
		<>
			<Grid
				container
				justify="flex-start"
				alignContent="center"
				style={{ marginTop: '5%' }}
				direction="column"
				spacing={2}
			>
				<Grid item>
					<Card>
						<CardContent>
							<Typography variant="h2">Links created last week</Typography>
							<Typography variant="h1" align="center">
								{weeklyCount}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item>
					<Card>
						<CardContent>
							<Typography variant="h2">Links created last month</Typography>
							<Typography variant="h1" align="center">
								{monthlyCount}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	)
}

export default Stats
