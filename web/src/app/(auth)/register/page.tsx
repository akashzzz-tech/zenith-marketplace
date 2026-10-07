'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function RegisterSelection() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <Link href="/" className="text-3xl font-black text-white tracking-wider">ZENITH</Link>
          <p className="text-white/40 text-sm mt-2">Choose how you want to join</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center hover:shadow-3xl transition-shadow">
            <div className="w-14 h-14 bg-cobaltDeep/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👤</span>
            </div>
            <h2 className="text-2xl font-bold text-black mb-3">Join as a Professional</h2>
            <p className="text-black/50 mb-6 text-sm">I am a retired or experienced professional (5+ years) looking for remote project opportunities.</p>
            <Link href="/register/professional">
              <Button className="w-full">Sign Up as Professional</Button>
            </Link>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center hover:shadow-3xl transition-shadow">
            <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏢</span>
            </div>
            <h2 className="text-2xl font-bold text-black mb-3">Join as a Client</h2>
            <p className="text-black/50 mb-6 text-sm">I am a company or organization looking to hire verified experienced professionals remotely.</p>
            <Link href="/register/client">
              <Button variant="outline" className="w-full">Sign Up as Client</Button>
            </Link>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-white/40">
          Already have an account?{' '}
          <Link href="/login" className="text-cobaltDeep font-semibold hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
