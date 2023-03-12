import React, { useEffect, useMemo, useState } from 'react';

import Layout, { Content, Header } from 'antd/es/layout/layout';
import { Button, message, Spin, Table } from 'antd';

import { userService } from './services/userService';

import { User } from './models/User';

import './App.css';
import Card from 'antd/es/card/Card';
import { UserAddOutlined } from '@ant-design/icons';
import UsersListing from './parts/UsersListing';

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

  return <Layout style={{ width: '100%', height: '100vh' }}>
    <Content style={{
      marginInline: 'auto',
      width: '100%',
      maxWidth: '1000px',
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
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
