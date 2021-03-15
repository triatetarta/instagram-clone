import React from 'react';

function App() {
  return (
    <div>
      <div className='app__header'>
        <img
          className='app__headerImage'
          src={process.env.PUBLIC_URL + '/assets/instagram.png'}
          alt=''
        />
      </div>
    </div>
  );
}

export default App;
