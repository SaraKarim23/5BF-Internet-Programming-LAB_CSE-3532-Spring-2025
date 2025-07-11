import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'
import SecurityAudit from './components/SecurityAudit';
import Settings from './components/settings';
import SecureNotes from './components/SecureNotes';

const Sidebar = ({ setPage }) => {
  return (
    <div className="w-56 bg-green-900 text-white min-h-screen p-4 space-y-4">
      {/* <h2 className="text-2xl font-semibold mb-6">Tools</h2> */}
      <button
        className="w-full text-left p-2 rounded hover:bg-green-700"
        onClick={() => setPage('manager')}
      >
        🗂 Password Manager
      </button>
      <button
        className="w-full text-left p-2 rounded hover:bg-green-700"
        onClick={() => setPage('audit')}
      >
        🔐 Security Audit
      </button>
      <button
        className="w-full text-left p-2 rounded hover:bg-green-700"
        onClick={() => setPage('settings')}
      >
        ⚙️ Settings
      </button>
      <button
        className="w-full text-left p-2 rounded hover:bg-green-700"
        onClick={() => setPage('securenotes')}
      >
        📝 Secure Notes
      </button>

    </div>
  );
};



function App() {

  const [page, setPage] = useState('manager');

  return (
    <>

      <Navbar />
      <div className="flex bg-green-50 min-h-screen">
        {/* Sidebar */}
        <Sidebar setPage={setPage} />

        {/* Main Content Area */}
        <div className="flex-1 p-6 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
          {page === 'manager' && <Manager />}
          {page === 'audit' && <SecurityAudit />}
          {page === 'settings' && <Settings />}
          {page === 'securenotes' && <SecureNotes />}
        </div>
      </div>
      <Footer />




      {/* <Manager/> */}
      {/* <Footer/> */}


    </>
  )
}

export default App
