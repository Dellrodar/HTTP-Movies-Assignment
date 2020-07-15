import React, { useState, useEffect } from 'react';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';

const initialItem = {
	title: '',
	director: '',
	metascore: '',
	stars: [],
};

function UpdatedMovie(props) {
	const { push } = useHistory();
	const { id } = useParams();
	const [movie, setMovie] = useState(initialItem);

	useEffect(() => {
		const movieToUpdate = props.movieList.find(movie => `${movie.id}` === id);

		if (movieToUpdate) {
			setMovie(movieToUpdate);
		}
	},[props.setMovie, id]);

	const handleTextInput = (e) => {
		e.persist();
		let targetValue = e.target.value;

		if (e.target.name === 'metascores') {
			targetValue = parseInt(targetValue, 10);
		} else if (e.target.name === 'stars') {
			targetValue = targetValue.split(',');
		}

		setMovie({
			...movie,
			[e.target.name]: targetValue,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.put(`http://localhost:5000/api/movies/${id}`, movie)
			.then((res) => {
				console.log(`Push sucessful:${res}`);
				props.getMovieList();
				push(`/movies/${id}`);
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<TextField
					type='text'
					name='title'
					label='Movie Title'
					variant='outlined'
					value={movie.title}
					onChange={handleTextInput}
				/>
				<TextField
					type='text'
					name='director'
					label='Movie Director'
					variant='outlined'
					value={movie.director}
					onChange={handleTextInput}
				/>
				<TextField
					type='number'
					name='metascore'
					label='Movie Metascore'
					placeholder='metascore'
					variant='outlined'
					value={movie.metascore}
					onChange={handleTextInput}
				/>
				<TextField
					type='text'
					name='stars'
					label='Movie Stars'
					variant='outlined'
					value={movie.stars}
					onChange={handleTextInput}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</>
	);
}

export default UpdatedMovie;
