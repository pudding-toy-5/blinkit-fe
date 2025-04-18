const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className='w-full min-w-[360px] max-w-[430px] mx-auto h-full bg-white relative flex flex-col overflow-auto scroll'>
      {children}
    </div>
  );
};

export default Layout;
