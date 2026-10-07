'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError(authError.message);
    } else {
      router.push('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-black text-white tracking-wider">ZENITH</Link>
          <p className="text-white/40 text-sm mt-2">Experience That Works Remotely.</p>
        </div>
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-2xl">
          <h1 className="text-2xl font-bold text-black mb-6 text-center">Sign In</h1>
          {error && (
            <div className="bg-error/10 text-error text-sm p-3 rounded-lg mb-4">{error}</div>
          )}
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit" loading={loading} className="w-full mt-4">Sign In</Button>
          <div className="mt-6 text-center text-sm text-black/50">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-cobaltDeep font-semibold hover:underline">Register here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}