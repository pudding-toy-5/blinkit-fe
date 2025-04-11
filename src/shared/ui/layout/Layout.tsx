const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className='w-full min-w-[375px] max-w-[430px] mx-auto h-dvh bg-white relative flex flex-col overflow-auto scroll'>
      {children}
    </div>
  );
};

export default Layout;
