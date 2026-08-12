import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
      <p className="text-text-secondary mb-8">Page not found.</p>
      <Link to="/" className="px-6 py-2 bg-background-card border border-white/10 rounded-lg text-text-primary hover:bg-white/5 transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
