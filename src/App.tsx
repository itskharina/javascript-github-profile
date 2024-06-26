import './App.css';
import Card from './components/Card';
import SmallerCard from './components/SmallerCard';
import Input from './components/Input';
import { useState, useEffect } from 'react';

function App() {
	const [cardData, setCardData] = useState<any[]>([]);
	const [userData, setUserData] = useState<any>({});
	const [inputValue, setInputValue] = useState('github');
	const [accountType, setAccountType] = useState('Organization');

	useEffect(() => {
		fetch(`https://api.github.com/users/${inputValue}/repos`)
			.then((res) => res.json())
			.then((data) => setCardData(data));
	}, [inputValue]);

	useEffect(() => {
		fetch(`https://api.github.com/users/${inputValue}`)
			.then((res) => res.json())
			.then((data) => {
				setUserData(data);
				setAccountType(data.type);
			});
	}, [inputValue]);

	const repoUrl =
		accountType === 'Organization'
			? `https://github.com/orgs/${inputValue}/repositories`
			: `https://github.com/${inputValue}?tab=repositories`;

	const cards = cardData.slice(0, 4).map((item) => {
		return (
			<Card
				key={item.id}
				id={item.id}
				name={item.name}
				description={item.description}
				forks={item.forks}
				stars={item.stargazers_count}
				updated={item.updated_at}
			/>
		);
	});

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

	return (
		<>
			<Input inputValue={inputValue} setInputValue={setInputValue} />
			<div className='smaller-cards-list'>{smallerCards}</div>
			<div className='cards-list'>{cards}</div>

			<a href={repoUrl} target='_blank'>
				View all repositories
			</a>
		</>
	);
}

export default App;
