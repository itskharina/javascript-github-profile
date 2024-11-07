import './App.css';
import Card from './components/Card';
import SmallerCard from './components/SmallerCard';
import Input from './components/Input';
import { useState, useEffect } from 'react';
import './components/Input.css';

// Type definition for GitHub user data
interface GithubUser {
	id: number;
	name: string;
	bio: string;
	followers: number;
	following: number;
	avatar_url: string;
	location: string;
}

// Type definition for GitHub repository data
interface GithubRepo {
	id: number;
	name: string;
	description: string | null;
	forks: number;
	stargazers_count: number;
	updated_at: string;
}

// Default user data structure to avoid undefined states
const defaultUserData: GithubUser = {
	id: 0,
	name: '',
	bio: '',
	followers: 0,
	following: 0,
	avatar_url: '',
	location: '',
};

function App() {
	// State management for repositories, user data, input value, and account type
	const [cardData, setCardData] = useState<GithubRepo[]>([]); // To store repo data
	const [userData, setUserData] = useState<GithubUser>(defaultUserData); // To store user data
	const [inputValue, setInputValue] = useState('github'); // Main input value that triggers API calls when Enter is pressed
	const [localValue, setLocalValue] = useState(inputValue); // Temporary input value that updates while user types
	const [accountType, setAccountType] = useState('Organization'); // Determines whether the account is a user or an organization

	// Fetch repository data whenever input value changes
	useEffect(() => {
		fetch(`https://api.github.com/users/${inputValue}/repos`)
			.then((res) => res.json())
			.then((data) => setCardData(data));
	}, [inputValue]);

	// Fetch user profile data whenever input value changes
	useEffect(() => {
		fetch(`https://api.github.com/users/${inputValue}`)
			.then((res) => res.json())
			.then((data) => {
				setUserData(data);
				setAccountType(data.type);
			});
	}, [inputValue]);

	// Determine correct repository URL based on account type
	const repoUrl =
		accountType === 'Organization'
			? `https://github.com/orgs/${inputValue}/repositories`
			: `https://github.com/${inputValue}?tab=repositories`;

	// Create repository cards (limited to 4)
	const cards = cardData.slice(0, 4).map((item) => {
		return (
			<Card
				key={item.id}
				id={item.id}
				name={item.name}
				description={item.description}
				forks={item.forks}
				stars={item.stargazers_count}
				updated_at={item.updated_at}
			/>
		);
	});

	// Render smaller card for the user profile data
	const smallerCards = (
		<SmallerCard
			key={userData.id}
			name={userData.name}
			bio={userData.bio}
			followers={userData.followers}
			following={userData.following}
			avatar={userData.avatar_url}
			location={userData.location}
		/>
	);

	// Handles the 'Enter' key press to update the input value when the user presses 'Enter'
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			// Update the main input value when 'Enter' is pressed
			// Triggers API calls via useEffect
			setInputValue(e.currentTarget.value);
		}
	};

	// Handles input field changes, used to update the local input value
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// Update local value with the current input
		// Updates visual input without triggering API calls through useEffect
		setLocalValue(e.target.value);
	};

	return (
		<>
			{/* Input field for GitHub username */}
			<div className='input'>
				<input
					type='text'
					value={localValue}
					placeholder='Enter a username'
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
				/>
			</div>
			{/* Render smaller user profile card */}
			<div className='smaller-cards-list'>{smallerCards}</div>

			{/* Render the list of repository cards */}
			<div className='cards-list'>{cards}</div>

			{/* Link to view all repositories for the user or organization */}
			<a href={repoUrl} target='_blank'>
				View all repositories
			</a>
		</>
	);
}

export default App;
