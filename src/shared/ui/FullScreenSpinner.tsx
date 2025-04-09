const FullScreenSpinner: React.FC = () => (
  <div className='w-full min-w-[375px] max-w-[430px] mx-auto h-screen bg-white relative flex flex-col overflow-hidden safe-area-wrapper'>
    <div className='flex flex-1 justify-center items-center'>
      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#222]' />
    </div>
  </div>
);

export default FullScreenSpinner;
