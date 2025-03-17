import { Link } from '@tanstack/react-router';

function HomePage() {
  return (
    <div>
      HomePage
      <div>
        <Link to='/about'>to AboutPage</Link>
      </div>
    </div>
  );
}

export default HomePage;
