import React, { useState } from 'react';

function Settings() {
  const [masterPassword, setMasterPassword] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [passwordLength, setPasswordLength] = useState(12);


  const handlePasswordChange = () => {
    alert(`Master password changed to: ${masterPassword}`);
    setMasterPassword('');
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    alert(`Dark Mode ${!darkMode ? 'Enabled' : 'Disabled'}`);
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      alert("Account deleted!");
      // Add deletion logic here
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">⚙️ Settings</h2>

      {/* Change Master Password */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Change Master Password</h3>
        <input
          type="password"
          placeholder="New Master Password"
          value={masterPassword}
          onChange={(e) => setMasterPassword(e.target.value)}
          className="border px-2 py-1 mr-2"
        />
        <button
          onClick={handlePasswordChange}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Update
        </button>
      </div>

      {/* Dark Mode Toggle */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Theme</h3>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={handleDarkModeToggle}
          />
          Enable Dark Mode
        </label>
      </div>

      {/* Password Generator Settings */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Password Generator Settings</h3>
        <label>
          Password Length:
          <input
            type="number"
            min="6"
            max="32"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
            className="ml-2 border px-2 py-1 w-20"
          />
        </label>
      </div>

      {/* Delete Account */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-red-600">Danger Zone</h3>
        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete My Account
        </button>
      </div>
    </div>
  );
}

export default Settings;


// components/Settings.jsx
// function Settings() {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">⚙️ Settings</h2>
//       <p>Here you can manage your preferences and configurations.</p>
//     </div>
//   );
// }

// export default Settings;
