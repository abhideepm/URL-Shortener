const resetPasswordConfirmation = (fullname: string): string =>
	`<div>
		<h3>Dear ${fullname},</h3>
		<p>Your password has been successful reset, you can now login with your new password.</p>
		<br>
		<div>
			Cheers!
		</div>
	</div>`

export default resetPasswordConfirmation
