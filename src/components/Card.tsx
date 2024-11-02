import './Card.css';
import star from '../assets/Star.svg';
import nesting from '../assets/Nesting.svg';

export interface CardProps {
	id: number;
	name: string;
	description: string | null;
	forks: number;
	stars: number;
	updated_at: string;
}

export default function Card(props: CardProps) {
	const updatedDate = new Date(props.updated_at);
	const dateNow = new Date();
	const daysAgo = Math.floor(
		(dateNow.getTime() - updatedDate.getTime()) / (1000 * 3600 * 24)
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
