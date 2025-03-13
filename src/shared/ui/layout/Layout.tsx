const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className='max-w-sm mx-auto h-screen bg-white flex flex-col'>
      {children}
    </div>
  );
};

export default Layout;
