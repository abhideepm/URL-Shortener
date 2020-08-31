import {
	Box,
	Button,
	Card,
	CardContent,
	CssBaseline,
	Grid,
	TextField,
	Typography,
	CircularProgress,
} from '@material-ui/core'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'

interface IFormInput {
	email: string
	password: string
	fullName: string
}

const Register: React.FC = () => {
	const history = useHistory()
	const { register, handleSubmit } = useForm()
	const [loading, setLoading] = useState<boolean>(false)

	const onSubmit = (data: IFormInput) => {
		setLoading(true)
		axios
			.post('/api/register', data)
			.then(() => {
				setLoading(false)
				alert('Please check your mail to proceed')
			})
			.catch(err => {
				alert(err)
				setLoading(false)
			})
	}
	return (
		<>
			<CssBaseline />
			<Grid
				container
				spacing={0}
				alignItems="center"
				justify="center"
				style={{ minHeight: '100vh' }}
			>
				<Grid item xs={12} sm={9} md={6} lg={4}>
					<Card raised={true} style={{ borderRadius: '1rem' }}>
						<CardContent>
							<Typography variant="h3" align="center">
								Register
							</Typography>
							<form onSubmit={handleSubmit(onSubmit)}>
								<Box my={2}>
									<TextField
										name="email"
										label="Email"
										variant="outlined"
										inputRef={register}
										fullWidth={true}
										required
									/>
								</Box>
								<Box my={2}>
									<TextField
										name="password"
										label="Password"
										variant="outlined"
										type="password"
										inputRef={register}
										fullWidth={true}
										required
									/>
								</Box>
								<Box my={2}>
									<TextField
										name="fullName"
										label="Full Name"
										variant="outlined"
										inputRef={register}
										fullWidth={true}
										required
									/>
								</Box>
								<Box display="flex" justifyContent="center" my={2}>
									<Button
										variant="contained"
										color="secondary"
										type="submit"
										size="large"
										disabled={loading}
									>
										{loading ? (
											<CircularProgress color="inherit" />
										) : (
											'Register'
										)}
									</Button>
								</Box>
								<Link to="/login">
									<Typography display="block" align="center">
										Login Instead
									</Typography>
								</Link>
							</form>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	)
}

export default Register
