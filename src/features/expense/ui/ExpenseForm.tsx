import RightArrowIcon from '@/shared/ui/RightArrowIcon';

const ExpenseForm: React.FC = () => {
  return (
    <form>
      <div>
        <label>날짜</label>
        <button>
          <p>2025년 2월 28일</p>
          <RightArrowIcon />
        </button>
      </div>
      <div>
        <label>카테고리</label>
        <button>
          <p>식비</p>
          <RightArrowIcon />
        </button>
      </div>
      <div>
        <label>메모</label>
        <input type='text' />
        <p>0/120</p>
      </div>
      <div>
        <label>금액</label>
        <input type='text' />
      </div>
      <button type='submit'>저장</button>
    </form>
  );
};

export default ExpenseForm;
