import './Card.css';
import star from '../assets/Star.svg';
import nesting from '../assets/Nesting.svg';

// SmallerCard component for displaying user profile information
export interface CardProps {
	id: number;
	name: string;
	description: string | null;
	forks: number;
	stars: number;
	updated_at: string;
}

// Card component for displaying GitHub repository information
export default function Card(props: CardProps) {
	// Calculate days since last update
	const updatedDate = new Date(props.updated_at);
	const dateNow = new Date();
	const daysAgo = Math.floor(
		// Calculate the difference between the current date and the updated date in milliseconds
		// Convert the time difference from milliseconds to days
		(dateNow.getTime() - updatedDate.getTime()) / (1000 * 3600 * 24) // 1000 ms * 3600 seconds * 24 hours = milliseconds in one day
	);

	return (
		<div className='card'>
			<p className='repo-name'>{props.name}</p>
			<p className='repo-description'>{props.description}</p>
			<div className='repo-stats'>
				<div className='forks flex'>
					<img src={nesting} alt='nesting' className='nesting-icon' />
					<p className='repo-forks'>{props.forks}</p>
				</div>
				<div className='stars flex'>
					<img src={star} alt='star' className='star-icon' />
					<p className='repo-stars'>{props.stars}</p>
				</div>
				<p className='repo-updated'>Updated {daysAgo} days ago</p>
			</div>
		</div>
	);
}
