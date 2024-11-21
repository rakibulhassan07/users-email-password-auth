import React from 'react';
import useUsers from '../../hooks/useUsers';

const Home = () => {
    const [users] = useUsers();
    return (
        <div>
          <h1> All users </h1>
        </div>
    );
};

export default Home;