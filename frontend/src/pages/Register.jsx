import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Sparkles } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const { registerUser, user, error, setError } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [pwdError, setPwdError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
    setError(null);
  }, [user, navigate, setError]);

  const { name, email, password, confirmPassword } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'confirmPassword' || e.target.name === 'password') setPwdError('');
  }

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPwdError('Passwords do not match');
    } else if (password.length < 6) {
      setPwdError('Password must be at least 6 characters');
    } else {
      setPwdError('');
      await registerUser({ name, email, password });
    }
  };

  return (
    <div className="container main-content flex items-center justify-center">
      <div className="card w-full max-w-lg mx-auto" style={{ padding: '3rem 2.5rem' }}>
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-input p-4 rounded-full mb-4" style={{ border: '1px solid var(--border)' }}>
            <UserPlus size={36} className="text-primary" />
          </div>
          <h1 className="font-bold text-transparent bg-clip-text bg-gradient-primary" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            Join DevConnect
          </h1>
          <p className="text-muted text-lg flex items-center justify-center gap-2">
            <Sparkles size={16} className="text-accent" /> Start building your network today
          </p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {pwdError && <div className="alert alert-danger">{pwdError}</div>}

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Type your name here..."
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="type your email here..."
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group mb-8">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              placeholder="Type password again"
              value={confirmPassword}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full" style={{ padding: '1rem', fontSize: '1.1rem' }}>
            Create Account
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-muted">
            Already have an account? <Link to="/login" className="text-primary font-bold hover:text-accent">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
