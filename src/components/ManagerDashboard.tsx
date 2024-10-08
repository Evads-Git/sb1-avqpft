import React, { useState } from 'react'

interface ManagerDashboardProps {
  theme: string
  onThemeSet: (theme: string) => void
  videos: { url: string; approved: boolean }[]
  onVideoApproval: (index: number) => void
  allVideosApproved: boolean
}

const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ 
  theme, 
  onThemeSet, 
  videos, 
  onVideoApproval,
  allVideosApproved
}) => {
  const [themeInput, setThemeInput] = useState('')

  const handleThemeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThemeInput(e.target.value.slice(0, 50))
  }

  const handleThemeSet = () => {
    if (themeInput.trim()) {
      onThemeSet(themeInput.trim())
      setThemeInput('')
    }
  }

  const getVideoEmbedUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/
    if (youtubeRegex.test(url)) {
      const videoId = url.split('v=')[1] || url.split('/').pop()
      return `https://www.youtube.com/embed/${videoId}`
    }
    return url
  }

  const renderVideo = (url: string) => {
    const embedUrl = getVideoEmbedUrl(url)
    if (embedUrl.includes('youtube.com/embed')) {
      return (
        <iframe
          src={embedUrl}
          className="w-full h-full absolute top-0 left-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )
    } else {
      return (
        <video 
          src={url} 
          controls 
          className="w-full h-full absolute top-0 left-0 object-cover"
          poster="https://via.placeholder.com/640x360.png?text=Video+Thumbnail"
        >
          Your browser does not support the video tag.
        </video>
      )
    }
  }

  return (
    <div className="netflix-card p-6 w-full max-w-3xl">
      <h2 className="text-3xl font-bebas mb-6 text-netflix-red">Manager Dashboard</h2>
      
      {!theme ? (
        <div className="mb-8">
          <h3 className="text-2xl font-bebas mb-4">Set Contest Theme</h3>
          <input
            type="text"
            placeholder="Enter theme (max 50 characters)"
            value={themeInput}
            onChange={handleThemeInput}
            className="netflix-input mb-4"
            maxLength={50}
          />
          <button
            className="netflix-btn w-full"
            onClick={handleThemeSet}
            disabled={!themeInput.trim()}
          >
            Set Theme
          </button>
          <p className="text-sm text-gray-400 mt-2">
            {50 - themeInput.length} characters remaining
          </p>
        </div>
      ) : (
        <div className="mb-8">
          <h3 className="text-2xl font-bebas mb-2">Current Theme</h3>
          <p className="text-xl text-gray-300">{theme}</p>
        </div>
      )}
      
      {theme && (
        <div>
          <h3 className="text-2xl font-bebas mb-4">Video Approval</h3>
          {videos.length === 0 ? (
            <p className="text-gray-400">Waiting for users to upload videos...</p>
          ) : (
            videos.map((video, index) => (
              <div key={index} className="mb-8 p-4 bg-gray-800 rounded">
                <div className="aspect-w-16 aspect-h-9 mb-4 relative">
                  {renderVideo(video.url)}
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-lg">
                    Status: <span className={video.approved ? 'text-green-500' : 'text-yellow-500'}>
                      {video.approved ? 'Approved' : 'Pending Approval'}
                    </span>
                  </p>
                  <button
                    onClick={() => onVideoApproval(index)}
                    className={`py-2 px-4 rounded ${
                      video.approved
                        ? 'bg-green-600 text-white cursor-not-allowed'
                        : 'netflix-btn'
                    }`}
                    disabled={video.approved}
                  >
                    {video.approved ? 'Approved' : 'Approve Video'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {allVideosApproved && (
        <div className="mt-8">
          <h3 className="text-2xl font-bebas mb-2 text-netflix-red">All Videos Approved</h3>
          <p className="text-gray-300">All videos have been approved. They will now be compiled into one video.</p>
        </div>
      )}
    </div>
  )
}

export default ManagerDashboard