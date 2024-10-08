import React, { useState } from 'react'

interface UploadVideoProps {
  onUpload: (videoUrl: string) => void
  disabled: boolean
}

const UploadVideo: React.FC<UploadVideoProps> = ({ onUpload, disabled }) => {
  const [videoUrl, setVideoUrl] = useState('')

  const handleUpload = () => {
    if (videoUrl) {
      onUpload(videoUrl)
      setVideoUrl('')
    }
  }

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bebas mb-4">Upload Video</h3>
      <input
        type="text"
        placeholder="Enter video URL (max 30 sec)"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="netflix-input mb-4"
        disabled={disabled}
      />
      <button
        onClick={handleUpload}
        className="netflix-btn w-full"
        disabled={disabled || !videoUrl}
      >
        Upload Video
      </button>
      {disabled && (
        <p className="text-sm text-gray-400 mt-2">
          You've reached the maximum number of uploads (3 videos).
        </p>
      )}
    </div>
  )
}

export default UploadVideo