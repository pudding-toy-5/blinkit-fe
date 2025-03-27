const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className='max-w-sm mx-auto h-screen bg-white relative flex flex-col overflow-hidden'>
      {children}
    </div>
  );
};

export default Layout;
