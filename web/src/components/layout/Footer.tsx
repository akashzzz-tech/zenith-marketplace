import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary text-white p-8 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">ZENITH</h3>
          <p className="text-sm text-accent">Experienced Talent. Remote Opportunities.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-secondary">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-secondary">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/refund">Refund Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8 pt-8 border-t border-white/20 text-center text-sm">
        &copy; {new Date().getFullYear()} ZENITH. All rights reserved.
      </div>
    </footer>
  );
}\n