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
	password: string
	repeatPassword: string
}

const ResetPassword: React.FC = () => {
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
									>
										Reset Password
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

export default ResetPassword
