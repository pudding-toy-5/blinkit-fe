const Layout: React.FC<{
  children?: React.ReactNode;
  isLoading?: boolean;
  guarded?: boolean;
}> = ({ children, isLoading, guarded }) => {
  if (!guarded) {
    return (
      <div className='max-w-sm mx-auto h-screen bg-white relative flex flex-col overflow-hidden'>
        {children}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='container mx-auto h-screen bg-white relative flex flex-col overflow-hidden safe-area-wrapper'>
        <div className='flex flex-1 justify-center items-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#222]' />
        </div>
      </div>
    );
  }

  return (
    <div className='container mx-auto h-screen bg-white relative flex flex-col overflow-hidden safe-area-wrapper'>
      {children}
    </div>
  );
};

export default Layout;
