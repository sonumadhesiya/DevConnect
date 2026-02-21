import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { User, Github, ArrowLeft, Briefcase, Code2, Terminal, Layers } from 'lucide-react';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileRes = await axios.get(`/api/profiles/user/${id}`);
        setProfile(profileRes.data.data);

        const projectsRes = await axios.get(`/api/projects/user/${id}`);
        setProjects(projectsRes.data.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id]);

  if (loading) return <div className="spinner"></div>;

  if (error || !profile) {
    return (
      <div className="container main-content flex flex-col items-center justify-center" style={{ minHeight: '60vh' }}>
        <Layers size={64} className="text-danger opacity-50 mb-6" />
        <h1 className="text-main font-bold text-3xl mb-4">Profile Unavailable</h1>
        <p className="text-muted text-xl mb-8">The developer you are looking for does not exist or has removed their profile.</p>
        <Link to="/profiles" className="btn btn-primary px-8">Return to Network</Link>
      </div>
    );
  }

  return (
    <div className="container main-content py-10">
      <Link to="/profiles" className="inline-flex items-center gap-2 text-muted hover:text-white mb-10 transition-colors bg-input px-4 py-2 rounded-full border" style={{ borderColor: 'var(--border)' }}>
        <ArrowLeft size={18} /> Back to Discover
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <div className="card text-center sticky top-28 border border-[rgba(255,255,255,0.05)] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="mx-auto rounded-full flex items-center justify-center mb-6 relative" style={{ width: '140px', height: '140px', background: 'var(--bg-dark)', border: '4px solid var(--primary-light)', boxShadow: '0 0 30px rgba(99,102,241,0.2)' }}>
              <Code2 size={60} className="text-primary-light" />
            </div>
            <h1 className="font-bold text-3xl mb-1 text-transparent bg-clip-text bg-gradient-primary">{profile.user?.name}</h1>
            <p className="text-muted text-lg mb-8">{profile.user?.email}</p>

            {profile.githubLink && (
              <div className="mb-8">
                <a href={profile.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary w-full justify-center flex gap-3" style={{ padding: '1rem' }}>
                  <Github size={22} /> View GitHub Profile
                </a>
              </div>
            )}

            <div className="text-left pt-6 border-t border-[rgba(255,255,255,0.08)]">
              <h4 className="font-bold mb-4 flex items-center gap-2 text-lg text-main">
                <Terminal size={20} className="text-accent" /> Tech Arsenal
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="badge bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.1)] text-main font-medium" style={{ padding: '0.4rem 0.8rem' }}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          {/* Bio Component */}
          {profile.bio && (
            <div className="card p-10 bg-[rgba(39,39,42,0.4)] border border-[rgba(99,102,241,0.1)]">
              <h2 className="font-bold text-2xl mb-6 text-primary-light flex items-center gap-2">About Developer</h2>
              <p className="text-xl leading-relaxed text-main" style={{ color: 'rgba(255,255,255,0.85)' }}>{profile.bio}</p>
            </div>
          )}

          {/* Projects Section */}
          <div>
            <h2 className="font-bold text-3xl mb-8 flex items-center gap-3 text-transparent bg-clip-text bg-gradient-primary">
              <Briefcase size={32} className="text-primary" /> Deployed Repositories
            </h2>

            {projects.length === 0 ? (
              <div className="card text-center py-20 bg-[rgba(24,24,27,0.5)] border-dashed border-[rgba(255,255,255,0.1)]">
                <Layers size={48} className="mx-auto text-muted opacity-30 mb-4" />
                <p className="text-muted text-xl">This developer hasn't added any projects yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8">
                {projects.map(project => (
                  <div key={project._id} className="card p-8 flex flex-col h-full bg-[rgba(24,24,27,0.8)] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(168,85,247,0.3)] hover:shadow-[0_10px_30px_rgba(168,85,247,0.1)] transition-all duration-300 transform hover:-translate-y-1">
                    <h3 className="font-bold mb-3 text-2xl text-main">{project.title}</h3>
                    <p className="text-muted mb-6 text-lg leading-relaxed flex-grow">{project.description}</p>

                    <div className="mt-auto">
                      <div className="mb-6 flex flex-wrap gap-2">
                        {project.techStack.map((tech, i) => (
                          <span key={i} className="badge bg-[rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)] text-muted" style={{ fontSize: '0.8rem' }}>{tech}</span>
                        ))}
                      </div>
                      <div className="pt-5 border-t border-[rgba(255,255,255,0.08)]">
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-accent font-bold hover:text-white transition-colors">
                          <Github size={18} /> Source Code
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
