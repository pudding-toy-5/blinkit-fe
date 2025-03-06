const ExpenseForm: React.FC = () => {
  return (
    <form>
      <div>
        <label>날짜:</label>
      </div>
      <div>
        <label>카테고리</label>
      </div>
      <div>
        <label>메모</label>
      </div>
      <div>
        <label>금액</label>
      </div>
      <button type="submit">저장</button>
    </form>
  );
};

export default ExpenseForm;
