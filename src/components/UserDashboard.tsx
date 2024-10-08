import React from 'react'
import UploadVideo from './UploadVideo'
import VideoList from './VideoList'

interface UserDashboardProps {
  theme: string
  onVideoUpload: (videoUrl: string) => void
  videos: { url: string; approved: boolean }[]
}

const UserDashboard: React.FC<UserDashboardProps> = ({ theme, onVideoUpload, videos }) => {
  return (
    <div className="netflix-card p-6 w-full max-w-2xl">
      <h2 className="text-3xl font-bebas mb-6 text-netflix-red">User Dashboard</h2>
      
      {theme ? (
        <>
          <div className="mb-8">
            <h3 className="text-2xl font-bebas mb-2">Current Theme</h3>
            <p className="text-xl text-gray-300">{theme}</p>
          </div>
          <UploadVideo onUpload={onVideoUpload} disabled={videos.length >= 3} />
          <VideoList videos={videos} />
        </>
      ) : (
        <p className="text-gray-400">Waiting for the manager to set the theme...</p>
      )}
    </div>
  )
}

export default UserDashboard