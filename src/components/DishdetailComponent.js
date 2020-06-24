import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Dishdetail extends Component {

	componentDidMount() {
		console.log('component did mount')
	}

	componentDidUpdate() {
		console.log('component did update')
	}

	renderDish(selectedDish) {

		console.log(this.props)

		if (selectedDish != null) {
			const comments = selectedDish.comments.map((comment) => {
				return (
					<div key={comment.id}>
						<p> {comment.comment} </p>
						<p>{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}	</p>
					</div>
				);
			});

			return (

				<div className="row">
					<div className="col-12 col-md-5 m-1">
						<Card>
							<CardImg width="100%" src={selectedDish.image} alt={selectedDish.name} />
							<CardBody>
								<CardTitle>{selectedDish.name}</CardTitle>
								<CardText>{selectedDish.description}</CardText>
							</CardBody>
						</Card>
					</div>

					<div className="col-12 col-md-5 m-1">
						<div className="container" maxHeight="50%">
							<h2>Comments</h2>
							{comments}
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div></div>
			);
		}
	}

	render() {

		const showDish = this.props.dish;

		return (
			<div className="container">
				{this.renderDish(showDish)}
			</div>
		);
	}
}

export default Dishdetail;

// import React from 'react';
// import { Card, CardImg, CardText, CardBody,
//     CardTitle } from 'reactstrap';


//     function RenderDish({dish}) {
    
//       . . .

//     }

//     function RenderComments({comments}) {
      
//       . . .
      
//     }

//     const  DishDetail = (props) => {

//       . . .
      
//     }

// export default DishDetail;