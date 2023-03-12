import React, { useMemo } from 'react';

import { Button, Card, Dropdown, Space, Spin, Table } from 'antd';
import { DeleteOutlined, DownOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';

import { User } from '../models/User';

import './UsersListing.css';

export type UsersListingProps = {
  loading: boolean,
  onDelete: (id: string) => void,
  onUpdate: (id: string) => void,
  onCreate: () => void,
  users: User[],
};

const UsersListing: React.FC<UsersListingProps> = ({ loading, users, onDelete, onUpdate, onCreate }) => {
  const userTableData = useMemo(
    () => users.map(user => ({
      key: user.id,
      actions: (<Dropdown
        menu={{
          items: [
            {
              key: 'edit',
              label: 'Edit',
              onClick: () => onUpdate(user.id),
              icon: <EditOutlined />
            },
            {
              key: 'delete',
              label: 'Delete',
              onClick: () => onDelete(user.id),
              icon: <DeleteOutlined />
            },
          ]
        }}
      >
        <Button type='text'>
          <Space>
            Actions
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>),
      ...user
    })),
    [users, onDelete, onUpdate]
  );

  return <Card
    title='Users Manager - CRUD'
    bodyStyle={{ padding: 0, borderTop: '1px solid rgba(0.0, 0.0, 0.0, 0.1)' }}
  >
    <Spin tip="Loading..." spinning={loading}>
      <Table
        dataSource={userTableData}
        pagination={false}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
          },
          {
            title: 'Role',
            dataIndex: 'role',
            key: 'role'
          },
          {
            title: <Button
              size='large'
              type='primary'
              className='create-user-btn'
              icon={<UserAddOutlined />}
              onClick={() => onCreate()}
            >Add</Button>,
            dataIndex: 'actions',
            key: 'actions',
            align: 'right'
          }
        ]}
      />
    </Spin>
  </Card>;
}

export default UsersListing; 
