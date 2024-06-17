import './SmallerCard.css';

export interface SmallerCardProps {
	name: string;
	bio: string;
	followers: number;
	following: number;
	avatar: string;
	location: string;
}

function ProfileSection({
	label,
	value,
}: {
	label: string;
	value: string | number;
}) {
	return (
		<div className='profile-section'>
			<h3>{label}</h3>
			<hr />
			<p>{value}</p>
		</div>
	);
}

export default function SmallerCard(props: SmallerCardProps) {
	return (
		<div className='smaller-card'>
			<div className='avatar-name-bio'>
				<img src={props.avatar} alt={props.name} className='avatar' />
				<h2 className='name'>{props.name}</h2>
				<p className='bio'>{props.bio}</p>
			</div>
			<ProfileSection label='Followers' value={props.followers} />
			<ProfileSection label='Following' value={props.following} />
			<ProfileSection label='Location' value={props.location} />
		</div>
	);
}
