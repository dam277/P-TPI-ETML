import React, { useEffect } from 'react';

function App() 
{	
	let api = process.env.REACT_APP_BACKEND_URL || "/"
	console.log("Api url: ", api)
	useEffect(() => 
	{
		fetch(api, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		
		})
		.then(response => response.json())
		.then(data => console.log(data))
	}, [])
	
	
	return (
		<div className="App">
			<header className="App-header">
				<p>
					Api url: {api}
				</p>
			</header>
		</div>
		);
	}
	
	export default App;
	