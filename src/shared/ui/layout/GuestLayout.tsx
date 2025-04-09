import React from 'react';

import Layout from './Layout';

const GuestLayout: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default GuestLayout;
