import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Terminal, Users, Search, Sparkles, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-12" style={{ minHeight: '70vh' }}>
        <div className="hero-badge">
          <Sparkles size={16} />
          <span>Welcome to the new standard for developers</span>
        </div>

        <div className="glow-icon-container">
          <Code2 size={48} className="text-primary" />
        </div>

        <h1 className="font-bold hero-title">
          The Ultimate Network <br /> for <span className="text-transparent bg-clip-text bg-gradient-primary">Top Developers</span>
        </h1>

        <p className="text-muted hero-desc">
          Create your profile, showcase your stunning projects, discover opportunities, and collaborate with world-class tech talents around the globe.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Get Started <ArrowRight size={18} />
          </Link>
          <Link to="/profiles" className="btn btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Explore Developers
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 mt-8">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl mb-4">Why join DevConnect?</h2>
          <p className="text-muted text-lg">Everything you need to grow your career and network.</p>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <div className="card text-center flex flex-col items-center">
            <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '1rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
              <Users size={32} style={{ color: '#c084fc' }} />
            </div>
            <h3 className="font-bold mb-3 text-xl">Connect & Network</h3>
            <p className="text-muted leading-relaxed">Network with other developers, find inspiring mentors, and rapidly grow your tech career.</p>
          </div>
          <div className="card text-center flex flex-col items-center">
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
              <Terminal size={32} className="text-success" style={{ color: '#34d399' }} />
            </div>
            <h3 className="font-bold mb-3 text-xl">Build & Showcase</h3>
            <p className="text-muted leading-relaxed">Highlight your best repositories, share your latest commits, and detail your tech stack.</p>
          </div>
          <div className="card text-center flex flex-col items-center">
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
              <Search size={32} className="text-primary" />
            </div>
            <h3 className="font-bold mb-3 text-xl">Discover Talent</h3>
            <p className="text-muted leading-relaxed">Search for specific talents based on niche skills to team up on your very next big idea.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
