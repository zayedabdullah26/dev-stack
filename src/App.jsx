import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [technologies, setTechnologies] = useState([]);
  const [stack, setStack] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}technologies.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch JSON');
        return res.json();
      })
      .then((data) => {
        setTechnologies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading technologies:', err);
        setLoading(false);
      });
  }, []);

  // 1. Add to stack & 2. Duplicate add attempt alert
  const addToStack = (tech) => {
    if (stack.some((item) => item.id === tech.id)) {
      toast.warn(`${tech.name} is already in your stack!`, {
        position: 'bottom-right',
        autoClose: 2000,
      });
      return;
    }
    setStack([...stack, tech]);
    toast.success(`Added ${tech.name} to your stack!`, {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  // 3. Remove single item alert
  const removeFromStack = (id, name) => {
    setStack(stack.filter((item) => item.id !== id));
    toast.info(`Removed ${name} from your stack.`, {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  // 4. Remove all / Clear stack alert
  const clearStack = () => {
    if (stack.length === 0) return;
    setStack([]);
    toast.error('Cleared entire stack.', {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  return (
    <div className="bg-white text-slate-800 font-sans antialiased min-h-screen flex flex-col relative">
      {/* React Toastify Container */}
      <ToastContainer />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 focus:outline-none"
            >
              ☰
            </button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                DS
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">Dev Stack</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="text-rose-600 font-semibold">Home</a>
            <a href="#technologies" className="hover:text-slate-900 transition">Technologies</a>
            <a href="#" className="hover:text-slate-900 transition">Projects</a>
            <a href="#" className="hover:text-slate-900 transition">About</a>
            <a href="#" className="hover:text-slate-900 transition">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-slate-700 hover:text-slate-900 hidden sm:inline">Sign In</a>
            <a href="#" className="text-sm font-medium text-white bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 hover:opacity-90 px-5 py-2.5 rounded-full shadow-sm transition">
              Sign Up
            </a>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden px-6 pt-4 pb-6 bg-white border-b border-slate-100 space-y-4 shadow-lg">
            <nav className="flex flex-col space-y-3 text-sm font-medium text-slate-600">
              <a href="#" className="text-rose-600 font-semibold">Home</a>
              <a href="#technologies" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-900">Technologies</a>
              <a href="#" className="hover:text-slate-900">Projects</a>
              <a href="#" className="hover:text-slate-900">About</a>
              <a href="#" className="hover:text-slate-900">Contact</a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Build Your Ideal <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 bg-clip-text text-transparent">
              Development Stack
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Explore frontend, backend, database, and tooling options, compare them side by side, and put together the stack that fits your next project.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <a href="#technologies" className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 text-white font-medium px-6 py-3 rounded-lg shadow-sm hover:opacity-95 transition">
              Explore Technologies
            </a>
            <a href="#" className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium px-6 py-3 rounded-lg transition">
              Learn More
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-lg">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-pink-500/20 to-violet-600/20 rounded-full blur-3xl"></div>
            <img
              src={`${import.meta.env.BASE_URL}banner-stack.png`}
              alt="Dev Stack Hero Banner"
              className="relative z-10 w-full h-auto object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section id="technologies" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex-grow w-full">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Explore the <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 bg-clip-text text-transparent">Technologies</span>
          </h2>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">Pick one technology per category to build your ideal stack.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {technologies.map((tech) => {
                const isAdded = stack.some((item) => item.id === tech.id);
                return (
                  <div key={tech.id} className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <img src={tech.icon} alt={tech.name} className="w-10 h-10 object-contain" />
                        <span className="text-xs font-semibold px-2.5 py-1 bg-rose-50 text-rose-600 rounded-full">
                          {tech.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg mb-1">{tech.name}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">{tech.description}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-4 text-xs font-medium text-slate-600 flex-wrap">
                        <span className="bg-slate-100 px-2.5 py-1 rounded-md">{tech.category}</span>
                        <span className="bg-slate-100 px-2.5 py-1 rounded-md">{tech.difficulty}</span>
                        <span className="ml-auto text-amber-500 font-semibold">★ {tech.rating}</span>
                      </div>

                      <button
                        onClick={() => addToStack(tech)}
                        disabled={isAdded}
                        className={`w-full text-sm font-medium py-2.5 rounded-xl transition ${isAdded
                            ? 'bg-emerald-600 text-white cursor-not-allowed'
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                      >
                        {isAdded ? '✓ Added to Stack' : 'Add to Stack'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-3 lg:sticky lg:top-28">
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base">Your Stack</h3>
                  {stack.length > 0 && (
                    <button
                      onClick={clearStack}
                      className="text-xs text-rose-600 hover:underline font-medium"
                    >
                      Remove All
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-500">
                  {stack.length === 0 ? 'No technologies selected yet.' : `${stack.length} Technology Selected`}
                </p>

                {stack.length === 0 ? (
                  <div className="border border-dashed border-slate-200 rounded-xl p-8 text-center text-slate-400 text-xs">
                    Your stack is empty.
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                    {stack.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-slate-50 border border-slate-100 p-3 rounded-xl">
                        <div className="flex items-center gap-3">
                          <img src={item.icon} alt={item.name} className="w-7 h-7 object-contain" />
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                            <span className="text-[10px] text-slate-500">{item.category}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromStack(item.id, item.name)}
                          className="text-slate-400 hover:text-rose-600 font-bold p-1 text-sm transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>


      {/* Footer Section */}
      <footer className="border-t border-slate-100 mt-20 bg-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 pb-12 border-b border-slate-100">
            {/* Brand Block */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-md">
                  DS
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-900">Dev Stack</span>
              </div>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Curated tools, technologies, and resources for developers building modern software.
              </p>
              <div className="flex items-center gap-4 pt-2 text-slate-600 font-medium text-xs">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-rose-600 transition">GitHub</a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-rose-600 transition">Twitter</a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-rose-600 transition">LinkedIn</a>
              </div>
            </div>

            {/* Link Group 1: Product */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Product</h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li><a href="#" className="hover:text-slate-900">Home</a></li>
                <li><a href="#technologies" className="hover:text-slate-900">Technologies</a></li>
                <li><a href="#" className="hover:text-slate-900">Projects</a></li>
              </ul>
            </div>

            {/* Link Group 2: Company */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li><a href="#" className="hover:text-slate-900">About</a></li>
                <li><a href="#" className="hover:text-slate-900">Contact</a></li>
                <li><a href="#" className="hover:text-slate-900">Careers</a></li>
              </ul>
            </div>

            {/* Link Group 3: Legal */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">Legal</h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li><a href="#" className="hover:text-slate-900">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-slate-900">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 Dev Stack. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-900 transition">Privacy Policy</a>
              <a href="#" className="hover:text-slate-900 transition">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
