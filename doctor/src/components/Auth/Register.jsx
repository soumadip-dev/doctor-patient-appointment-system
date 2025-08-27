import { useState } from 'react';

export const Register = ({ onRegister, onSwitchToLogin }) => {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'doctor',
    specialization: '',
  });

  const handleSubmit = e => {
    e.preventDefault();
    onRegister(registerData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
          <input
            type="text"
            value={registerData.name}
            onChange={e => setRegisterData({ ...registerData, name: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
          <input
            type="email"
            value={registerData.email}
            onChange={e => setRegisterData({ ...registerData, email: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
          <input
            type="password"
            value={registerData.password}
            onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Specialization:</label>
          <input
            type="text"
            value={registerData.specialization}
            onChange={e => setRegisterData({ ...registerData, specialization: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?
        <button
          onClick={onSwitchToLogin}
          className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none focus:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
};
