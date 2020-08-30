const forgotPasswordEmail = (fullname: string, url: string): string =>
	`<div>
		<h3>Dear ${fullname},</h3>
		<p>You requested for a password reset.</p>
		<p>Kindly use this <a href=${url}>link</a> to reset your password</p>
		<br>
		<p>Thank You</p>
	</div>`

export default forgotPasswordEmail
