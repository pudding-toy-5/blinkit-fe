import { Link } from 'react-router';

export interface SubPageHeaderProps {
  backLink: string;
  title: string;
}

const SubPageHeader: React.FC<SubPageHeaderProps> = ({ backLink, title }) => {
  return (
    <header className="flex flex-row h-12 px-4 py-3">
      <Link className="w-6 h-6" aria-label="뒤로가기" to={backLink}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.5946 19.7351C15.2991 20.0635 14.7932 20.0902 14.4648 19.7946L6.46483 12.5944C6.29626 12.4427 6.20001 12.2265 6.20001 11.9998C6.20001 11.773 6.29627 11.5568 6.46484 11.4051L14.4648 4.20513C14.7932 3.90956 15.2991 3.93618 15.5946 4.26459C15.8902 4.593 15.8636 5.09883 15.5352 5.3944L8.19588 11.9998L15.5352 18.6053C15.8636 18.9009 15.8902 19.4067 15.5946 19.7351Z"
            fill="#33363D"
          />
        </svg>
      </Link>
      <h1 className="ml-2 text-base">{title}</h1>
    </header>
  );
};

export default SubPageHeader;
