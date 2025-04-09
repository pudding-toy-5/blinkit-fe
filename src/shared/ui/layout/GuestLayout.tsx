import React from 'react';

const GuestLayout: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className='w-full min-w-[375px] max-w-[430px] mx-auto h-screen bg-white relative flex flex-col overflow-hidden safe-area-wrapper'>
      {children}
    </div>
  );
};

export default GuestLayout;
