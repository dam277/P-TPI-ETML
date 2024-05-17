// import React, { useEffect, useState } from 'react';

// function App() 
// {	
// 	let api = process.env.REACT_APP_BACKEND_URL || "/"
// 	console.log("Api url: ", api)
	
// 	const [users, setUsers] = useState({users: []})
// 	useEffect(() => {
// 		fetch(api + "/users", {
// 			method: 'GET',
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'Accept': 'application/json'
// 			}
// 		})
// 		.then(response => response.json())
// 		.then(data => {
// 			console.log('Data from server:', data);
// 			setUsers(data);
// 		})
// 	}, []);
	
// 	return (
// 		<div className="App">
// 			<header className="App-header">
// 				<p>
// 					Api url: {api}
// 				</p>
// 				<p>
// 					Users from backend : {users.users && users.users.map((user) => <p> - {user}</p>)}
// 				</p>
// 			</header>
// 		</div>
// 	);
// 	}
	
// 	export default App;
	


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    let api = process.env.REACT_APP_BACKEND_URL || "/"
    console.log("Api url: ", api)

    return (
        <Router>
            <Routes>
                <Route path="/" element={<h1>Welcome to the Home page!</h1>} />
                <Route path="/login" element={<h1>Login</h1>} />
            </Routes>
        </Router>
    );
}

export default App;