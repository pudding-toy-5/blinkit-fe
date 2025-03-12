const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className='max-w-sm mx-auto h-screen bg-gray-100 flex flex-col'>
      {children}
    </div>
  );
};

export default Layout;
