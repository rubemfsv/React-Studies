import React, { Component } from 'react';
import {
	Card, CardImg, CardText, CardBody,
	CardTitle, Breadcrumb, BreadcrumbItem, Button,
	Modal, ModalHeader, ModalBody, Label, Input, Col, Row
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isModalOpen: false
		}
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal() {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	handleSubmit(values) {
		this.toggleModal();
		this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
	}

	render() {
		return (
			<>
				<Button outline onClick={this.toggleModal}>
					<span className="fa fa-pencil"> Submit Comment</span>
				</Button>

				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody className="ml-3 mr-3">
						<LocalForm onSubmit={(values) => this.handleSubmit(values)} >
							<Row className="form-group">
								<Label htmlFor="rating">Rating</Label>
								<Control.select model=".rating" id="rating" name="rating"
									placeholder="1"
									className="form-control">
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</Control.select>
							</Row>
							<Row className="form-group">
								<Label htmlFor="author" >Your Name</Label>
								<Control.text model=".author" id="author" name="author"
									placeholder="Your Name"
									className="form-control"
									validators={{
										required, minLength: minLength(3), maxLength: maxLength(15)
									}}
								/>
								<Errors
									className="text-danger"
									model=".author"
									show="touched"
									messages={{
										required: 'Required, ',
										minLength: 'Must be greater than 2 characters',
										maxLength: 'Must be 15 characters or less'
									}}
								/>
							</Row>
							<Row className="form-group">
								<Label htmlFor="comment">Comment</Label>
								<Control.textarea model=".comment" id="comment" name="comment"
									rows="8"
									placeholder="comment"
									className="form-control" />
							</Row>
							<Button type="submit" color="primary" >Submit</Button>
						</LocalForm>
					</ModalBody>
				</Modal>
			</>
		);
	}
}

function RenderDish({ dish }) {
	return (
		<FadeTransform
			in
			transformProps={{
				exitTransform: 'scale(0.5) translateY(-50%)'
			}}>
			<Card>
				<CardImg top src={baseUrl + dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		</FadeTransform>
	);
}

function RenderComments({ comments, postComment, dishId }) {
	if (comments != null) {
		return (
			<Stagger in>
				<h2>Comments</h2>
				{comments.map(comment => {
					return (
						<Fade in>
							<div key={comment.id}>
								<p> {comment.comment} </p>
								<p> -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}	</p>
							</div>
						</Fade>
					);
				})}
				<CommentForm dishId={dishId} postComment={postComment} />
			</Stagger>
		);
	} else {
		return (
			<div></div>
		);
	}
}

const DishDetail = (props) => {

	const dish = props.dish;
	const comments = props.comments;
	const postComment = props.postComment;
	const isLoading = props.isLoading;
	const errMess = props.errMess;

	console.log(props)

	if (isLoading) {
		return (
			<div className="container">
				<div className="row">
					<Loading />
				</div>
			</div>
		);
	} else if (errMess) {
		return (
			<div className="container">
				<div className="row">
					<h4>{errMess}</h4>
				</div>
			</div>
		);
	} else if (dish != null) {
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem><Link to='/menu'>Menu</Link> </BreadcrumbItem>
						<BreadcrumbItem active>{dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{dish.name}</h3>
					</div>
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish={dish} />
					</div>
					<div className="col-12 col-md-5 m-1">
						<RenderComments comments={comments}
							postComment={postComment}
							dishId={dish.id} />
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

