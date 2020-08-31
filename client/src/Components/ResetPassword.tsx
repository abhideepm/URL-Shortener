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
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

interface IFormInput {
	password: string
	repeatPassword: string
}

const ResetPassword: React.FC = () => {
	const history = useHistory()
	const { token } = useParams()
	const { register, handleSubmit, reset } = useForm()
	const [loading, setLoading] = useState<boolean>(true)
	const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)

	useEffect(() => {
		axios
			.get(`/api/password/tokenstatus/${token}`)
			.then(res => {
				console.log(res.data)
				if (res.data.message === 'Token accepted') {
					setLoading(false)
				} else {
					alert('Token Expired, request verfication again')
					history.push('/forgotpassword')
				}
			})
			.catch(err => console.log(err))
	}, [])

	const onSubmit = (data: IFormInput): void => {
		setLoadingSubmit(true)
		if (data.password !== data.repeatPassword) {
			alert(`Passwords don't match`)
			reset()
		} else {
			axios
				.post('/api/password/resetpassword', {
					password: data.password,
					token: token,
				})
				.then(res => {
					setLoadingSubmit(false)
					if (res.data.message === 'Success') {
						alert('Password reset successful')
						history.replace('/login')
					}
				})
				.catch(err => {
					alert(err)
					setLoadingSubmit(false)
				})
		}
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
				{loading ? (
					<>
						<Grid
							item
							container
							spacing={2}
							alignItems="center"
							justify="center"
							direction="column"
						>
							<CircularProgress />
							<Typography variant="h5" color="primary">
								Verifying Token
							</Typography>
						</Grid>
					</>
				) : (
					<Grid item xs={12} sm={9} md={6} lg={4}>
						<Card raised={true} style={{ borderRadius: '1rem' }}>
							<CardContent>
								<Typography variant="h3" align="center">
									Reset Password
								</Typography>
								<form onSubmit={handleSubmit(onSubmit)}>
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
											name="repeatPassword"
											label="Repeat Password"
											variant="outlined"
											type="password"
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
											disabled={loadingSubmit}
										>
											{loadingSubmit ? (
												<CircularProgress color="inherit" />
											) : (
												'Reset Password'
											)}
										</Button>
									</Box>
									<Link to="/login">
										<Typography display="block" align="center">
											Sign In Instead
										</Typography>
									</Link>
								</form>
							</CardContent>
						</Card>
					</Grid>
				)}
			</Grid>
		</>
	)
}

export default ResetPassword
