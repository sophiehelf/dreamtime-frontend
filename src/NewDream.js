import React from 'react'
import { Route, Redirect } from 'react-router'

class NewDream extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			content: "(Empty dream)",
			name: "(Empty dream)",
			redirect: false
		}
	}

	handleSubmitAndRedirect = (e) => {
		this.makePostRequest()
		setTimeout(this.setState({
					redirect: true
				}), 1000)
	} 

	handleNameChange = (e) => {
		e.preventDefault();
		this.setState({
			name: e.target.value
		})
		console.log(this.state.name)
	}

	handleContentChange = (e) => {
		e.preventDefault()
		this.setState({
			content: e.target.value
		})
		console.log(this.state.content)
	}

	makePostRequest = (e) => {
		fetch("http://localhost:3001/dreams", {
			method: "post",
			headers: {
				'Accept': 'application/json',
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				name: this.state.name,
				content: this.state.content
			})
		})
	}

	render() {

		if (this.state.redirect === true) {
			return (
				<Redirect from="/new" to="/" />
			)
		} else  {

		return(
			<div className="new-dream">
			<h3>New dream</h3>
				<textarea placeholder="Name your dream" name="dream-name" onChange={this.handleNameChange} className="dream-name-input"></textarea> <br /> <br />
				<textarea placeholder="Describe your dream here..." name="dream" className="dream-text-input" onChange={this.handleContentChange}>
				</textarea>
				<br />
				<input type="submit" value="Send it off" onClick={this.handleSubmitAndRedirect} />
			</div>
		)
	}
	
}

}

export default NewDream