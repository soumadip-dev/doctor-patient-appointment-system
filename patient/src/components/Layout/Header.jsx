export const Header = ({ user, onLogout }) => (
  <header className="bg-white shadow-md border-b border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <h1 className="text-2xl font-bold text-gray-900">Patient Portal</h1>
        {user && (
          <div className="flex items-center space-x-4">
            <p className="text-gray-700">
              Welcome, <span className="font-semibold">{user.name}</span>
            </p>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  </header>
);
