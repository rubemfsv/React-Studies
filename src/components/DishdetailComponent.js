import React from 'react';
import {
	Card, CardImg, CardText, CardBody,
	CardTitle
} from 'reactstrap';

function RenderDish({ dish }) {
	return (
		<Card>
			<CardImg width="100%" src={dish.image} alt={dish.name} />
			<CardBody>
				<CardTitle>{dish.name}</CardTitle>
				<CardText>{dish.description}</CardText>
			</CardBody>
		</Card>
	);
}

function RenderComments({ comment }) {
	return (
		<div key={comment.id}>
			<p> {comment.comment} </p>
			<p>{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}	</p>
		</div>
	);
}

const DishDetail = (props) => {

	const dish = props.dish;

	if (dish != null) {

		const comments = dish.comments.map((comment) => {
			return (
				<RenderComments comment={comment} />
			);
		});

		return (
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish={dish} />
					</div>
					<div className="col-12 col-md-5 m-1">
						<h2>Comments</h2>
						{comments}
					</div>
				</div>

			</div>
		);
	} else {
		return (
			<div className="container">
			</div>
		);
	}
}

export default DishDetail;

