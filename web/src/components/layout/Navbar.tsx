import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white border-b border-accent/20">
      <Link href="/" className="text-2xl font-bold text-primary">ZENITH</Link>
      <div className="hidden md:flex space-x-6 text-primary">
        <Link href="/professionals">Find Talent</Link>
        <Link href="/projects">Find Projects</Link>
        <Link href="/how-it-works">How It Works</Link>
      </div>
      <div className="space-x-4">
        <Link href="/login" className="text-primary">Login</Link>
        <Link href="/register" className="bg-primary text-white px-4 py-2 rounded">Register</Link>
      </div>
    </nav>
  );
}\n