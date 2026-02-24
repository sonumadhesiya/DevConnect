import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { User, Code2, Trash2, Edit2, Plus, Github, FolderGit2, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [profileForm, setProfileForm] = useState({ bio: '', skills: '', githubLink: '' });
  const [projectForm, setProjectForm] = useState({ title: '', description: '', techStack: '', githubLink: '' });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const profileRes = await axios.get('/api/profiles/me');
        setProfile(profileRes.data.data);
        setProfileForm({
          bio: profileRes.data.data.bio || '',
          skills: profileRes.data.data.skills.join(', ') || '',
          githubLink: profileRes.data.data.githubLink || ''
        });

        const projectsRes = await axios.get(`/api/projects/user/${user.id}`);
        setProjects(projectsRes.data.data);
      } catch (err) {
        if (err.response?.status !== 404) {
          console.error('Error fetching dashboard data');
        }
      }
      setLoading(false);
    };
    fetchDashboardData();
  }, [user.id]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/profiles', profileForm);
      setProfile(res.data.data);
      setShowProfileForm(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Error saving profile');
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/projects', projectForm);
      setProjects([res.data.data, ...projects]);
      setShowProjectForm(false);
      setProjectForm({ title: '', description: '', techStack: '', githubLink: '' });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || 'Error adding project');
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await axios.delete(`/api/projects/${id}`);
      setProjects(projects.filter(proj => proj._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="container main-content py-10">
      <div className="flex justify-between items-center mb-10 pb-6 border-b" style={{ borderColor: 'var(--border)' }}>
        <div>
          <h1 className="font-bold text-transparent bg-clip-text bg-gradient-primary flex items-center gap-3 dashboard-title">
            <div className="bg-input p-3 rounded-xl border" style={{ borderColor: 'var(--border)', color: 'var(--primary-light)' }}>
              <User size={36} />
            </div>
            Developer Dashboard
          </h1>
          <p className="text-muted text-xl mt-2 flex items-center gap-2">
            Welcome back, <strong className="text-main">{user.name}</strong>!
          </p>
        </div>
        {!profile && !showProfileForm && (
          <button className="btn btn-primary flex items-center gap-2" onClick={() => setShowProfileForm(true)}>
            <Plus size={20} /> Setup Your Profile
          </button>
        )}
      </div>
      {!profile && !showProfileForm && (
        <div className="alert bg-input border" style={{ borderColor: 'var(--accent)', color: 'var(--text-main)', padding: '1.5rem', borderRadius: '16px' }}>
          <div className="flex gap-4 items-start w-full">
            <AlertCircle size={32} style={{ color: 'var(--accent)' }} className="shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-xl mb-2 text-transparent bg-clip-text bg-gradient-primary">Profile Incomplete</h3>
              <p className="text-muted text-lg mb-4">You need to setup your profile first before you can showcase your incredible projects.</p>
              <button className="btn btn-primary" onClick={() => setShowProfileForm(true)}>Complete Profile Now</button>
            </div>
          </div>
        </div>
      )}
      {showProfileForm && (
        <div className="card mb-12 shadow-card dashboard-card">
          <h2 className="font-bold text-2xl mb-6 text-primary">{profile ? 'Edit Developer Profile' : 'Create Developer Profile'}</h2>
          <form onSubmit={handleProfileSubmit}>
            <div className="form-group mb-6">
              <label>Developer Bio</label>
              <textarea className="form-control" value={profileForm.bio} onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })} placeholder="Tell us about your developer journey, passions, and background..." />
            </div>
            <div className="form-group mb-6">
              <label>Tech stack & Skills *</label>
              <input type="text" className="form-control" value={profileForm.skills} onChange={(e) => setProfileForm({ ...profileForm, skills: e.target.value })} placeholder="React, Node.js, Python, AWS..." required />
              <small className="text-muted mt-2 block flex items-center gap-2">Please use comma separated values (e.g. React, Docker, MongoDB)</small>
            </div>
            <div className="form-group mb-8">
              <label>GitHub Profile Link</label>
              <input type="url" className="form-control" value={profileForm.githubLink} onChange={(e) => setProfileForm({ ...profileForm, githubLink: e.target.value })} placeholder="https://github.com/yourusername" />
            </div>
            <div className="flex gap-4">
              <button type="submit" className="btn btn-primary px-8">Save Profile</button>
              {profile && <button type="button" className="btn btn-secondary px-6" onClick={() => setShowProfileForm(false)}>Discard Changes</button>}
            </div>
          </form>
        </div>
      )}
      {profile && !showProfileForm && (
        <div className="card mb-12 flex gap-8">
          <div className="shrink-0 hidden md:block">
            <div className="bg-input rounded-2xl flex items-center justify-center border" style={{ width: '150px', height: '150px', background: 'var(--bg-card-hover)', borderColor: 'var(--border)' }}>
              <Code2 size={64} className="text-primary-light" opacity={0.5} />
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-bold text-3xl mb-1">{user.name}</h2>
                {profile.githubLink && (
                  <a href={profile.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted hover:text-accent font-medium">
                    <Github size={18} /> @{profile.githubLink.split('/').pop()}
                  </a>
                )}
              </div>
              <button className="btn btn-secondary flex items-center gap-2" onClick={() => setShowProfileForm(true)}>
                <Edit2 size={16} /> Edit Profile
              </button>
            </div>

            {profile.bio && <p className="mb-6 text-lg leading-relaxed text-muted">{profile.bio}</p>}

            <div>
              <h4 className="font-bold mb-3 text-sm tracking-wider text-muted uppercase">Core Skills</h4>
              <div className="flex flex-wrap gap-3">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="badge tracking-wide" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {profile && (
        <>
          <div className="flex justify-between items-center mb-8 mt-16 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
            <h2 className="font-bold flex items-center gap-3 text-3xl">
              <FolderGit2 size={32} className="text-accent" /> Repository Showcase
            </h2>
            {!showProjectForm && (
              <button className="btn btn-primary flex items-center gap-2" onClick={() => setShowProjectForm(true)}>
                <Plus size={18} /> Add Project
              </button>
            )}
          </div>

          {showProjectForm && (
            <div className="card mb-12 shadow-card dashboard-card">
              <h3 className="font-bold mb-6 text-2xl text-accent">Add New Project Repository</h3>
              <form onSubmit={handleProjectSubmit}>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="form-group mb-0">
                    <label>Project Title *</label>
                    <input type="text" className="form-control" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} placeholder="e.g. Next.js E-Commerce" required />
                  </div>
                  <div className="form-group mb-0">
                    <label>GitHub Repository URL *</label>
                    <input type="url" className="form-control" value={projectForm.githubLink} onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })} placeholder="https://github.com/user/repo" required />
                  </div>
                </div>
                <div className="form-group mb-6">
                  <label>Description *</label>
                  <textarea className="form-control" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} placeholder="A highly scalable E-commerce application that..." required />
                </div>
                <div className="form-group mb-8">
                  <label>Tech Stack Used *</label>
                  <input type="text" className="form-control" value={projectForm.techStack} onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })} placeholder="Next.js, Tailwind, Prisma, PostgreSQL" required />
                  <small className="text-muted mt-2 block">Keep it comma separated (e.g. React, Express, MongoDB)</small>
                </div>
                <div className="flex gap-4">
                  <button type="submit" className="btn btn-primary px-8">Save Project</button>
                  <button type="button" className="btn btn-secondary px-6" onClick={() => setShowProjectForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          {projects.length === 0 && !showProjectForm ? (
            <div className="card text-center py-16 bg-input border-dashed">
              <FolderGit2 size={64} className="text-muted mx-auto mb-4 opacity-50" />
              <h3 className="font-bold text-xl mb-2 text-main">No projects to showcase yet</h3>
              <p className="text-muted mb-6">Start building your portfolio by adding your first project.</p>
              <button className="btn btn-primary px-8" onClick={() => setShowProjectForm(true)}>Add your first project</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map(project => (
                <div key={project._id} className="card relative p-8 group flex flex-col h-full bg-card hover:bg-card-hover border border-[rgba(255,255,255,0.05)] shadow-lg hover:shadow-[0_12px_40px_rgba(168,85,247,0.15)] transition-all duration-300 transform hover:-translate-y-2">
                  <button onClick={() => deleteProject(project._id)} className="absolute top-6 right-6 text-danger hover:scale-110 transition bg-[rgba(239,68,68,0.1)] p-2 rounded-lg opacity-0 group-hover:opacity-100" title="Delete project">
                    <Trash2 size={20} />
                  </button>
                  <div className="mb-4">
                    <h3 className="font-bold text-2xl pr-12 text-transparent bg-clip-text bg-gradient-primary">{project.title}</h3>
                  </div>
                  <p className="text-muted mb-6 text-lg leading-relaxed flex-grow">{project.description}</p>

                  <div className="mt-auto">
                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="badge bg-input text-main" style={{ background: 'var(--bg-dark)', color: 'var(--text-main)', border: '1px solid var(--border)', fontSize: '0.8rem' }}>{tech}</span>
                      ))}
                    </div>
                    <div className="pt-5 border-t border-[rgba(255,255,255,0.1)]">
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-accent font-bold transition-colors">
                        <Github size={18} /> Explore Source Code
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
