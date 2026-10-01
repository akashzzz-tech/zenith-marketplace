'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function RegisterSelection() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Join as a Professional</h2>
          <p className="text-accent mb-6">I am an experienced professional looking for remote opportunities.</p>
          <Link href="/register/professional">
            <Button className="w-full">Sign Up as Professional</Button>
          </Link>
        </div>
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Join as a Client</h2>
          <p className="text-accent mb-6">I am a company looking to hire verified experienced professionals.</p>
          <Link href="/register/client">
            <Button variant="secondary" className="w-full">Sign Up as Client</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
