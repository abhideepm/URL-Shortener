import {
	Box,
	Button,
	Card,
	CardContent,
	CssBaseline,
	Grid,
	TextField,
	Typography,
} from '@material-ui/core'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

interface IFormInput {
	email: string
}

const ForgotPassword: React.FC = () => {
	const history = useHistory()
	const { register, handleSubmit } = useForm()

	const onSubmit = (data: IFormInput): void => {
		console.log(data)
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
								Forgot Password
							</Typography>
							<Typography variant="body1" align="center">
								Enter your email address below and we'll send a verification
								email to reset your password
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

								<Box display="flex" justifyContent="center" my={2}>
									<Button
										variant="contained"
										color="primary"
										type="submit"
										size="large"
									>
										Verify
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
			</Grid>
		</>
	)
}

export default ForgotPassword
