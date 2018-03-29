import React from 'react'
import { Route, Redirect } from 'react-router'

class DreamShow extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			id: this.props.match.params.id,
			redirect: false
		}
	}

	componentDidMount() {
		fetch(`http://localhost:3001/dreams/${this.state.id}`)
			.then(res => res.json())
			.then(json => this.setState({
				id: this.state.id,
				name: json.name,
				content: json.content
			}))
	}

  deleteAndRedirect = () => {
		console.log("deleting")
	    return fetch(`http://localhost:3001/dreams/${this.state.id}`, {
	      method: "DELETE",
	      headers: {
	      	Accept: "application/json",
	      	'Content-type': 'application/json'
	      }
	    }).then(res => res.json())
	    		this.setState({
	    			redirect: true
	    		})
	}


	render() {


		if (this.state.redirect === true) {
			return (
				<Redirect to="/" />
			)
			console.log(this.state)
		} else  {

			return(
				<div>
					<h4>{this.state.name}</h4>
					<p>{this.state.content}</p>
					<button onClick={this.deleteAndRedirect}>Delete this dream</button>
				</div>
			)
		}
	}

}

export default DreamShow