import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Code2, Users, Layers } from 'lucide-react';

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async (skill = '') => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/profiles${skill ? `?skill=${skill}` : ''}`);
      setProfiles(res.data.data);
    } catch (err) {
      console.error('Error fetching profiles', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProfiles(searchTerm);
  };

  return (
    <div className="container main-content py-12">
      <div className="text-center mb-16">
        <div className="glow-icon-container" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
          <Users size={36} className="text-accent" />
        </div>
        <h1 className="font-bold text-transparent bg-clip-text bg-gradient-primary mb-4" style={{ fontSize: '3rem' }}>
          Discover Talent
        </h1>
        <p className="text-muted text-xl mb-10 max-w-2xl mx-auto">Explore our global network of elite developers. Search by specific skills to find the perfect collaborator for your next grand vision.</p>

        <form onSubmit={handleSearch} className="flex justify-center flex-wrap gap-4 max-w-2xl mx-auto p-4 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', backdropFilter: 'var(--glass)' }}>
          <div className="flex-1 relative">
            <input
              type="text"
              className="form-control"
              placeholder="e.g., React, Python, AWS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '3rem', height: '100%', border: 'none', background: 'transparent', boxShadow: 'none' }}
            />
            <Search size={22} className="absolute text-muted" style={{ left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
          <button type="submit" className="btn btn-primary px-8">Search</button>
          {searchTerm && (
            <button type="button" className="btn btn-secondary px-6" onClick={() => { setSearchTerm(''); fetchProfiles(''); }}>Clear</button>
          )}
        </form>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : profiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {profiles.map(profile => (
            <div key={profile._id} className="profile-card flex flex-col h-full bg-card hover:bg-card-hover border border-[rgba(255,255,255,0.05)] shadow-lg hover:shadow-[0_12px_40px_rgba(99,102,241,0.15)] transition-all duration-300 mt-8 relative pt-12">
              {/* Avatar Float */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-[4px] flex items-center justify-center shadow-lg" style={{ width: '90px', height: '90px', background: 'var(--bg-dark)', borderColor: 'var(--primary-light)' }}>
                <Code2 size={40} className="text-primary-light" />
              </div>

              <div className="text-center flex-grow flex flex-col">
                <h3 className="font-bold text-2xl mb-1 mt-4">{profile.user?.name}</h3>
                <p className="text-muted mb-6 line-clamp-2 px-2" style={{ minHeight: '3rem' }}>{profile.bio ? profile.bio : 'Passionate developer ready to build amazing things.'}</p>

                <div className="mt-auto w-full">
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {profile.skills.slice(0, 4).map((skill, index) => (
                      <span key={index} className="badge" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>{skill}</span>
                    ))}
                    {profile.skills.length > 4 && <span className="badge" style={{ background: 'transparent', color: 'var(--text-muted)' }}>+{profile.skills.length - 4}</span>}
                  </div>
                  <div className="pt-4 border-t border-[rgba(255,255,255,0.08)]">
                    <Link to={`/profile/${profile.user?._id}`} className="inline-flex w-full justify-center items-center py-2 text-primary font-bold hover:text-accent transition-colors">
                      View Full Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-input rounded-3xl border-dashed max-w-3xl mx-auto">
          <Layers size={64} className="text-muted mx-auto mb-6 opacity-30" />
          <p className="text-main text-2xl font-bold mb-2">No talent found matching your criteria</p>
          <p className="text-muted text-lg">Try adjusting your skill search keywords.</p>
        </div>
      )}
    </div>
  );
};

export default Profiles;
