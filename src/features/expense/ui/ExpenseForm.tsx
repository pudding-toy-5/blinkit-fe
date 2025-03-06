import RightArrowIcon from '@/shared/ui/RightArrowIcon';

const ExpenseForm: React.FC = () => {
  return (
    <form className='flex flex-col mx-4 mt-4 h-screen'>
      <div className='flex flex-row '>
        <label>날짜</label>
        <button className='flex flex-row ml-auto'>
          <p>2025년 2월 28일</p>
          <RightArrowIcon />
        </button>
      </div>
      <div className='flex flex-row mt-5'>
        <label>카테고리</label>
        <button className='flex flex-row ml-auto'>
          <p>식비</p>
          <RightArrowIcon />
        </button>
      </div>
      <div className='flex flex-col mt-5'>
        <label>메모</label>
        <input
          type='text'
          className='my-2 h-38 bg-20 rounded-md border-1 border-black/10'
        />
        <p className='ml-auto'>0/120</p>
      </div>
      <div className='flex flex-col mt-5'>
        <label>금액</label>
        <input
          type='number'
          className='h-11 border-box p-3 rounded-md border-1 border-black/10'
        />
      </div>
      <button
        type='submit'
        className='mt-auto mb-5 p-3 bg-black text-white rounded-lg'
      >
        저장
      </button>
    </form>
  );
};

export default ExpenseForm;
