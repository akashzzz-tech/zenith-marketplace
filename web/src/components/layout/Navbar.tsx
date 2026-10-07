import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-black border-b border-white/10">
      <Link href="/" className="text-2xl font-bold text-white tracking-wider">ZENITH</Link>
      <div className="hidden md:flex space-x-6 text-white/80">
        <Link href="/professionals" className="hover:text-white transition-colors">Find Talent</Link>
        <Link href="/projects" className="hover:text-white transition-colors">Find Projects</Link>
        <Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/login" className="text-white/80 hover:text-white transition-colors">Login</Link>
        <Link href="/register" className="bg-cobaltDeep text-white px-5 py-2 rounded-lg font-semibold hover:bg-cobaltDeep/90 transition-colors">Register</Link>
      </div>
    </nav>
  );
}