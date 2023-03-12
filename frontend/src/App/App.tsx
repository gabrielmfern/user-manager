import React, { useEffect, useState } from 'react';

import Layout, { Content } from 'antd/es/layout/layout';
import { message } from 'antd';

import UsersListing from './parts/UsersListing/UsersListing';
import UsersFormModal from './parts/UsersForm/UsersFormModal';

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
      console.error(response.message);
      message.error('Unable to fetch all of the available users!');
    } else {
      setUsers(response.users || []);
    }
  };

  useEffect(() => { // when the component is mounted
    fetchUsers();
  }, []);

  const [userBeingEdited, setUserBeingEdited] = useState<User>();
  const [userFormOpen, setUserFormOpen] = useState<boolean>(false);

  return <Layout className='global-layout'>
    <Content className='user-manager-content'>
      <div style={{ flex: 1 }}>
        <UsersListing
          onCreate={() => {
            setUserBeingEdited(undefined);
            setUserFormOpen(true);
          }}
          onDelete={async (id) => {
            setLoading(true);
            const response = await userService.deleteUserById(id);
            if (response.status === 'error') {
              console.error(response.message);
              message.error(`Unable to delete the user with id ${id}!`);
            } else {
              await fetchUsers();
            }
            setLoading(false);
          }}
          onUpdate={async (id: string) => {
            setLoading(true);
            const response = await userService.getUserById(id);
            if (response.status === 'error') {
              console.error(response.message);
              message.error(`Unable to find the user with id ${id}!`);
            } else {
              setUserBeingEdited(response.user!);
              setUserFormOpen(true);
            }
            setLoading(false);
          }}
          loading={loading}
          users={users}
        />

        <UsersFormModal
          user={userBeingEdited}
          open={userFormOpen}
          onCancel={() => setUserFormOpen(false)}
          onSubmit={async (formData) => {
            if (typeof userBeingEdited !== 'undefined') {
              setLoading(true);
              const response = await userService.updateUser({
                id: userBeingEdited.id,
                ...formData
              });
              if (response.status === 'error') {
                console.error(response.message);
                message.error(`Unable to update the user with id ${userBeingEdited.id}`);
              } else {
                await fetchUsers();
              }
              setLoading(false);
            } else {
              setLoading(true);
              const response = await userService.createUser(formData);
              if (response.status === 'error') {
                console.error(response.message);
                message.error(`Unable to create new user!`);
              } else {
                await fetchUsers();
              }
              setLoading(false);
            }
            setUserFormOpen(false);
          }}
        />
      </div>
    </Content>
  </Layout>;
}

export default App;
