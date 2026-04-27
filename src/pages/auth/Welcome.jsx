import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-dvh bg-white text-on-surface flex flex-col">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-white border-b border-[#F1F1F1] h-16 flex items-center justify-between px-4">
        <span className="text-xl font-extrabold text-[#68B946] tracking-tighter">PaidSheet</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="text-zinc-500 font-semibold hover:bg-zinc-50 transition-colors px-3 py-2 rounded-lg text-sm active:scale-95 duration-150"
          >
            Login
          </button>
        </div>
      </header>

      <main className="pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full flex-1">
        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center min-h-[530px]">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center px-3 py-1.5 bg-[#D9EAD3] text-primary rounded-full font-semibold text-sm gap-1.5">
              <span className="material-symbols-outlined text-[18px]">school</span>
              FOR STUDENTS, BY STUDENTS
            </div>
            <h1 className="text-[40px] font-bold leading-tight text-on-background max-w-xl">
              PaidSheet
            </h1>
            <p className="text-[18px] text-on-surface-variant max-w-lg leading-relaxed">
              The trusted campus task marketplace for students. Earn while you learn, or get help with your daily campus tasks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => navigate('/login')}
                className="bg-[#236d00] text-white font-semibold text-[16px] px-10 py-4 rounded transition-colors hover:bg-[#1a5200] active:scale-95 duration-150"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-[#F1F1F1] text-on-surface font-semibold text-[16px] px-10 py-4 rounded transition-colors hover:bg-[#e2e2e2] active:scale-95 duration-150"
              >
                Login
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="aspect-square w-full bg-surface-container rounded-xl overflow-hidden border border-[#F1F1F1]">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"
                alt="Students collaborating"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white border border-[#F1F1F1] p-4 rounded-xl dry-shadow hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#D9EAD3] flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">verified_user</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Verified Profile</p>
                  <p className="text-xs text-on-surface-variant">Active Student Status</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mt-20 space-y-12">
          <div className="text-center space-y-1">
            <h2 className="text-[32px] font-bold">Why PaidSheet?</h2>
            <p className="text-on-surface-variant">Designed for the academic rhythm.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white border border-[#F1F1F1] p-6 rounded-xl flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">assignment</span>
                </div>
                <h3 className="text-[24px] font-semibold">Campus-First Tasks</h3>
                <p className="text-on-surface-variant">From printing assignments to cafeteria runs — every campus micro-task, structured and paid.</p>
              </div>
              <div className="mt-6 h-36 bg-surface-container rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80" alt="Study" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="bg-white border border-[#F1F1F1] p-6 rounded-xl space-y-3">
              <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">payments</span>
              </div>
              <h3 className="text-[24px] font-semibold">Instant Payouts</h3>
              <p className="text-on-surface-variant">Get paid instantly upon task completion through our secure campus-linked system.</p>
            </div>
            <div className="bg-white border border-[#F1F1F1] p-6 rounded-xl space-y-3">
              <div className="w-12 h-12 bg-surface-container rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">people</span>
              </div>
              <h3 className="text-[24px] font-semibold">Dual Role</h3>
              <p className="text-on-surface-variant">Post tasks as an Asker, complete them as a Doer. Switch anytime.</p>
            </div>
            <div className="md:col-span-2 bg-white border border-[#F1F1F1] p-6 rounded-xl flex items-center gap-8">
              <div className="flex-1 space-y-3">
                <h3 className="text-[24px] font-semibold">Trust is our currency</h3>
                <div className="space-y-1">
                  <div className="flex justify-between font-semibold text-sm">
                    <span>Platform Safety</span><span>98%</span>
                  </div>
                  <div className="w-full h-2 bg-[#D9EAD3] rounded-full overflow-hidden">
                    <div className="w-[98%] h-full bg-[#236d00]" />
                  </div>
                </div>
                <p className="text-on-surface-variant text-sm">Every student is verified through university credentials to ensure a safe marketplace.</p>
              </div>
              <div className="hidden sm:block">
                <span className="material-symbols-outlined text-[100px] text-surface-container">shield_with_heart</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 bg-surface-container rounded-xl p-12 text-center border border-[#F1F1F1]">
          <h2 className="text-[32px] font-bold mb-3">Ready to boost your campus life?</h2>
          <p className="text-[18px] text-on-surface-variant mb-6 max-w-2xl mx-auto">
            Join thousands of students already completing tasks and earning on PaidSheet.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-[#236d00] text-white font-semibold text-[16px] px-10 py-4 rounded-full transition-colors hover:bg-[#1a5200] active:scale-95 duration-150"
          >
            Join the Network
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="hidden md:block py-12 border-t border-[#F1F1F1]">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center text-on-surface-variant text-sm">
          <div className="flex items-center gap-6">
            <span className="font-extrabold text-[#68B946]">PaidSheet</span>
            <span>© 2024 PaidSheet. All rights reserved.</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Safety Guide</a>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 flex justify-around items-center px-4 bg-white border-t border-[#F1F1F1] z-50">
        <div className="flex flex-col items-center text-[#68B946]">
          <span className="material-symbols-outlined ms-fill">home</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
        </div>
        <button onClick={() => navigate('/login')} className="flex flex-col items-center text-zinc-400">
          <span className="material-symbols-outlined">assignment</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Tasks</span>
        </button>
        <button onClick={() => navigate('/login')} className="flex flex-col items-center text-zinc-400">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
        </button>
      </nav>
    </div>
  );
}
