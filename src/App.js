// import React, { useState, useEffect } from 'react';
// import './App.css'; // Import your styles
// import Router from './router/Router';

// const App = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   // useEffect to handle theme changes
//   useEffect(() => {
//     const body = document.body;
//     if (isDarkMode) {
//       body.classList.add('dark-mode');
//     } else {
//       body.classList.remove('dark-mode');
//     }
//   }, [isDarkMode]);

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   return (
//     <div>
//     <div className="App">
//       <div className="changeMode">
//         <h1>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</h1>
//         <label className="switch">
//           <input type="checkbox" onChange={toggleTheme} />
//           <span className="slider round"></span>
//         </label>
//       </div>
//     </div>
//     <Router />
//     </div>
//   );
// };

// export default App;


import './App.css';
import Router from './router/Router';

function App() {
  return (
    <div>
      <Router />
    </div>
  );
}

export default App;


