import {
	Button,
	Grid,
	TextField,
	Typography,
	CircularProgress,
} from '@material-ui/core'
import React, { useState } from 'react'
import axios from 'axios'

const Home: React.FC = () => {
	const [fullURL, setFullURL] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)

		axios
			.post('/api/url/shorturl', { fullURL: fullURL })
			.then(res => {
				setFullURL('')
				setLoading(false)
				alert('Successful')
			})
			.catch(err => alert(err))
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Grid
					container
					justify="center"
					alignContent="center"
					style={{ minHeight: '90vh' }}
					direction="column"
					spacing={2}
				>
					<Grid item>
						<Typography variant="h2" color="initial">
							Enter a valid URL to shorten below
						</Typography>
					</Grid>
					<Grid item>
						<TextField
							id="fullurl"
							label="URL"
							value={fullURL}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setFullURL(e.target.value)
							}
							required
							autoFocus
							style={{ minWidth: '100%' }}
						/>
					</Grid>
					<Grid item>
						<Button
							variant="contained"
							color="primary"
							fullWidth
							size="large"
							type="submit"
							disabled={loading}
						>
							{loading ? <CircularProgress color="inherit" /> : 'Submit'}
						</Button>
					</Grid>
				</Grid>
			</form>
		</>
	)
}

export default Home
