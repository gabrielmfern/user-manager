import React, { useEffect, useState } from 'react';

import Layout, { Content } from 'antd/es/layout/layout';
import { message } from 'antd';

import UsersListing from './parts/UsersListing';

import { userService } from './services/userService';

import { User } from './models/User';

import './App.css';


const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await userService.getUsers();
    setLoading(false);
    if (response.status === 'error') {
      message.error('Unable to fetch all of the available users!');
    } else {
      console.log(response);
      setUsers(response.users || []);
    }
  };

  useEffect(() => { // when the component is mounted
    fetchUsers();
  }, []);

  return <Layout className='global-layout'>
    <Content className='user-manager-content'>
      <div style={{ flex: 1 }}>
        <UsersListing
          onCreate={() => {}}
          onDelete={() => {}}
          onUpdate={() => {}}
          loading={loading}
          users={users}
        />
      </div>
    </Content>
  </Layout>;
}

export default App;
