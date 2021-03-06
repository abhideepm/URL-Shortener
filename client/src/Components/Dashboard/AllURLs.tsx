import {
	Grid,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Link,
} from '@material-ui/core'
import axios from 'axios'
import { formatDistance } from 'date-fns'
import React, { useEffect, useState } from 'react'

interface IData {
	full: string
	short: string
	created: Date
	_id: string
	__v: number
}

const AllURLs: React.FC = () => {
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
			<Grid
				container
				justify="flex-start"
				alignContent="center"
				style={{ minHeight: '90vh' }}
				direction="column"
				spacing={2}
			>
				<Grid item style={{ minWidth: '70%' }}>
					<TableContainer component={Paper} style={{ marginTop: '5%' }}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell align="center">Full URL</TableCell>
									<TableCell align="center">Short URL</TableCell>
									<TableCell align="center">Created</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{urlData.map(row => (
									<TableRow key={row._id}>
										<TableCell align="center">{row.full}</TableCell>
										<TableCell align="center">
											<Link
												href={`https://${row.full}`}
												target="_blank"
												rel="noreferrer"
											>
												/{row.short}
											</Link>
										</TableCell>
										<TableCell align="center">
											{formatDistance(new Date(row.created), new Date(), {
												addSuffix: true,
											})}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</>
	)
}

export default AllURLs
