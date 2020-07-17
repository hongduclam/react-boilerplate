import React from 'react';
import { SmileOutlined, CrownOutlined } from '@ant-design/icons';

const defaultProps = {
  route: {
    path: '/',
    routes: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        icon: <SmileOutlined />,
        component: 'app/pages/dashboard',
      },
      {
        path: '/inventory',
        name: 'Inventory Managements',
        icon: <CrownOutlined />,
        access: 'canAdmin',
        component: './inventory',
        routes: [
          {
            path: '/inventory/sub-page',
            name: 'Sub 1',
            icon: <CrownOutlined />,
            component: './Welcome',
          },
          {
            path: '/inventory/sub-page1',
            name: 'Sub 2',
            icon: <CrownOutlined />,
            component: './Welcome',
          },
          {
            path: '/inventory/sub-page2',
            name: 'Sub 3',
            icon: <CrownOutlined />,
            component: './Welcome',
          },
        ],
      },
    ],
  },
  location: {
    pathname: '/',
  },
};

export default defaultProps;
