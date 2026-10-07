import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white p-8 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 tracking-wider">ZENITH</h3>
          <p className="text-sm text-white/60">Experienced Talent. Remote Opportunities.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-cobaltDeep">Platform</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-cobaltDeep">For You</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/for-professionals" className="hover:text-white transition-colors">For Professionals</Link></li>
            <li><Link href="/for-clients" className="hover:text-white transition-colors">For Companies</Link></li>
            <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-cobaltDeep">Legal</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link></li>
            <li><Link href="/dispute" className="hover:text-white transition-colors">Dispute Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8 pt-8 border-t border-white/10 text-center text-sm text-white/50">
        &copy; {new Date().getFullYear()} ZENITH. All rights reserved.
      </div>
    </footer>
  );
}