import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function CategoriesPage() {
  const categories = [
    { title: 'Software Engineering', icon: '💻', desc: 'Backend, Frontend, Fullstack, Systems, DevOps, Cloud' },
    { title: 'Data Science & AI', icon: '🤖', desc: 'Machine Learning, Deep Learning, MLOps, Statistics' },
    { title: 'Cybersecurity', icon: '🛡️', desc: 'Pen Testing, SOC, DevSecOps, Compliance, Threat Analysis' },
    { title: 'Mechanical Engineering', icon: '⚙️', desc: 'CAD, SolidWorks, FEA Analysis, Thermal & Fluid Systems' },
    { title: 'Civil & Structural', icon: '🏗️', desc: 'BIM, AutoCAD, Structural Analysis, Infrastructure Design' },
    { title: 'Electrical & Electronics', icon: '⚡', desc: 'PCB Design, Embedded Systems, IoT, Power Engineering' },
    { title: 'Industrial & Manufacturing', icon: '🏭', desc: 'Quality Engineering, Six Sigma, Lean, Process Optimization' },
    { title: 'Automotive Engineering', icon: '🚗', desc: 'Powertrain, EV Architecture, Automotive Electronics' },
    { title: 'Aerospace Engineering', icon: '🚀', desc: 'Avionics, Aerodynamics, Flight Control Systems' },
    { title: 'Architecture & CAD', icon: '🏛️', desc: 'Revit, 3D Architectural Rendering, Urban Planning' },
    { title: 'Technical Consulting', icon: '💡', desc: 'Enterprise Architecture, Digital Transformation, Audits' },
    { title: 'Project Management', icon: '📋', desc: 'PMP, Agile Coaching, Scrum Master, Risk Mitigation' },
    { title: 'Business Consulting', icon: '📊', desc: 'Growth Strategy, Operational Restructuring, M&A Advisory' },
    { title: 'Scientific Research', icon: '🔬', desc: 'Literature Reviews, Experimental Design, Data Synthesis' },
    { title: 'Technical Writing', icon: '✍️', desc: 'API Documentation, Whitepapers, Engineering Manuals' },
    { title: 'Finance & Risk Consulting', icon: '📈', desc: 'Financial Modeling, Compliance, Valuation, Auditing' },
    { title: 'Healthcare Consulting', icon: '🏥', desc: 'Regulatory Affairs, Medical Devices, Clinical Operations (Non-Clinical Advice)' },
    { title: 'Education & Training', icon: '🎓', desc: 'Technical Curriculum, Corporate Mentorship, Executive Training' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <section className="pt-16 pb-12 px-4 max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-black text-primary mb-3">All Professional Disciplines</h1>
        <p className="text-slate-600 text-base max-w-2xl mx-auto">
          Explore specialized fields serviced by verified professionals and retired engineering and business leaders.
        </p>
      </section>

      <section className="pb-16 px-4 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((c, i) => (
            <div key={i} className="p-5 bg-white rounded-xl border border-slate-200 hover:border-secondary/40 transition-all flex flex-col justify-between">
              <div>
                <span className="text-3xl block mb-2">{c.icon}</span>
                <h3 className="font-bold text-primary text-base mb-1">{c.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{c.desc}</p>
              </div>
              <Link
                href={`/professionals?category=${encodeURIComponent(c.title)}`}
                className="text-xs font-semibold text-primary hover:text-secondary inline-flex items-center gap-1"
              >
                Browse Experts →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
