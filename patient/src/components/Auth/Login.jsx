import { useState } from 'react';

export const Login = ({ onLogin, onSwitchToRegister }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '', role: 'patient' });

  const handleSubmit = e => {
    e.preventDefault();
    onLogin(loginData);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Patient Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email:</label>
          <input
            type="email"
            value={loginData.email}
            onChange={e => setLoginData({ ...loginData, email: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password:</label>
          <input
            type="password"
            value={loginData.password}
            onChange={e => setLoginData({ ...loginData, password: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
      </form>
      <p className="text-center text-gray-600 mt-4">
        Don't have an account?{' '}
        <button
          onClick={onSwitchToRegister}
          className="text-blue-600 hover:text-blue-800 font-medium focus:outline-none focus:underline focus:ring-0"
        >
          Register
        </button>
      </p>
    </div>
  );
};
