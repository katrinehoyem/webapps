import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

export default App;

export function App() {
	return (
		<Layout>
		  {<Main/>}
		</Layout>
	)
}