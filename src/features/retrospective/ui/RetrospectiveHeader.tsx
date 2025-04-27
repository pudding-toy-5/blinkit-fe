interface Props {
  amount: {
    total: number;
    essential: number;
    conscious: number;
    emotional: number;
  };
}

const RetrospectiveHeader: React.FC<Props> = ({ amount }) => {
  const { total, essential, conscious, emotional } = amount;

  return (
    <header className='flex flex-col'>
      <span className='text-[22px], text-[#222] font-semibold'>{total}</span>
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <span>{essential}</span>
      <span>{conscious}</span>
      <span>{emotional}</span>
    </header>
  );
};

export default RetrospectiveHeader;
