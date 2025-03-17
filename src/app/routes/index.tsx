import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

export function HomePage() {
  return (
    <div>
      <h1>HomePage</h1>
    </div>
  );
}

export default HomePage;
