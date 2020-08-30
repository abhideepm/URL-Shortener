const newUser = (fullname: string, url: string): string =>
	`<div>
		<h3>Dear ${fullname},</h3>
    <p>Thank you for Signing up at URL Shortener!</p>
    <p>Kindly use this <a href=${url}>link</a> to set your password</p>
		<br>
		<div>
			Cheers!
		</div>
	</div>`

export default newUser
