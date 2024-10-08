import React from 'react'
import { Play } from 'lucide-react'

interface LandingPageProps {
  onLogin: (role: 'manager' | 'user') => void
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center p-4">
      <div className="flex items-center mb-12">
        <Play className="text-netflix-red w-20 h-20 mr-4" />
        <h1 className="text-8xl font-bebas text-netflix-red">iCone</h1>
      </div>
      <p className="text-2xl text-gray-300 mb-12 font-roboto">The Ultimate Video Contest Platform</p>
      <div className="flex space-x-8">
        <button
          onClick={() => onLogin('manager')}
          className="netflix-btn text-xl px-8 py-3"
        >
          Login as Manager
        </button>
        <button
          onClick={() => onLogin('user')}
          className="netflix-btn text-xl px-8 py-3"
        >
          Login as User
        </button>
      </div>
    </div>
  )
}

export default LandingPage