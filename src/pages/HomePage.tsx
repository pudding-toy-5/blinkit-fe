import { NavLink } from 'react-router';

function HomePage() {
  return (
    <div>
      HomePage
      <div>
        <NavLink to='/about' end>
          to AboutPage
        </NavLink>
      </div>
    </div>
  );
}

export default HomePage;
