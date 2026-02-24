import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Code2 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { loginUser, user, error, setError } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
    setError(null);
  }, [user, navigate, setError]);

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    await loginUser(formData);
  };

  return (
    <div className="container main-content flex items-center justify-center">
      <div className="card w-full max-w-lg mx-auto" style={{ padding: '3rem 2.5rem' }}>
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-input p-4 rounded-full mb-4" style={{ border: '1px solid var(--border)' }}>
            <LogIn size={36} className="text-accent" />
          </div>
          <h1 className="font-bold text-transparent bg-clip-text bg-gradient-primary" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            Welcome Back
          </h1>
          <p className="text-muted text-lg">Log in to your account</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={onSubmit}>
          <div className="form-group mb-5">
            <label>Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Type your email here.."
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group mb-8">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full" style={{ padding: '1rem', fontSize: '1.1rem' }}>
            Sign In
          </button>
        </form>

        <div className="text-center mt-8 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
          <p className="text-muted">
            Don't have an account? <Link to="/register" className="text-primary font-bold hover:text-accent">Create One</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
