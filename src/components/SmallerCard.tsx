import './SmallerCard.css';

export interface SmallerCardProps {
	name: string;
	bio: string;
	followers: number;
	following: number;
	avatar: string;
	location: string;
}

interface ProfileSectionProps {
	label: string;
	value: string | number;
}

// ProfileSection component for displaying a label and value (used for followers, following, etc.)
function ProfileSection(props: ProfileSectionProps) {
	return (
		<div className='profile-section'>
			<h3>{props.label}</h3>
			<hr />
			<p>{props.value}</p>
		</div>
	);
}

// SmallerCard component for displaying user profile information
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
