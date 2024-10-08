import React, { useState } from 'react'
import { Play } from 'lucide-react'
import UploadVideo from './components/UploadVideo'
import VideoList from './components/VideoList'
import LandingPage from './components/LandingPage'
import ManagerDashboard from './components/ManagerDashboard'
import UserDashboard from './components/UserDashboard'

function App() {
  const [theme, setTheme] = useState('')
  const [videos, setVideos] = useState<{ url: string; approved: boolean }[]>([])
  const [userRole, setUserRole] = useState<'manager' | 'user' | null>(null)

  const handleThemeSet = (newTheme: string) => {
    setTheme(newTheme)
  }

  const handleVideoUpload = (videoUrl: string) => {
    if (videos.length < 3) {
      setVideos([...videos, { url: videoUrl, approved: false }])
    }
  }

  const handleVideoApproval = (index: number) => {
    const updatedVideos = [...videos]
    updatedVideos[index].approved = true
    setVideos(updatedVideos)
  }

  const handleLogin = (role: 'manager' | 'user') => {
    setUserRole(role)
  }

  const allVideosApproved = videos.length === 3 && videos.every(video => video.approved)

  const RoleSwitcher = () => (
    <div className="absolute top-4 right-4 flex space-x-2">
      <button
        onClick={() => setUserRole('manager')}
        className={`flex items-center px-3 py-2 rounded ${
          userRole === 'manager' ? 'bg-netflix-red text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
      >
        Manager
      </button>
      <button
        onClick={() => setUserRole('user')}
        className={`flex items-center px-3 py-2 rounded ${
          userRole === 'user' ? 'bg-netflix-red text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
      >
        User
      </button>
    </div>
  )

  if (!userRole) {
    return <LandingPage onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-netflix-black flex flex-col items-center p-4 relative">
      <RoleSwitcher />
      <div className="flex items-center mb-8 mt-16">
        <Play className="text-netflix-red w-12 h-12 mr-3" />
        <h1 className="text-6xl font-bebas text-netflix-red">iCone</h1>
      </div>
      
      {userRole === 'manager' && (
        <ManagerDashboard
          theme={theme}
          onThemeSet={handleThemeSet}
          videos={videos}
          onVideoApproval={handleVideoApproval}
          allVideosApproved={allVideosApproved}
        />
      )}

      {userRole === 'user' && (
        <UserDashboard
          theme={theme}
          onVideoUpload={handleVideoUpload}
          videos={videos}
        />
      )}
    </div>
  )
}

export default App