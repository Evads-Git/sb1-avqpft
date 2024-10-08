import React from 'react'

interface VideoListProps {
  videos: { url: string; approved: boolean }[]
}

const VideoList: React.FC<VideoListProps> = ({ videos }) => {
  return (
    <div className="mb-4">
      <h3 className="text-2xl font-bebas mb-4">Uploaded Videos</h3>
      <div className="grid grid-cols-1 gap-6">
        {videos.map((video, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded">
            <video src={video.url} controls className="w-full h-48 object-cover rounded mb-4" />
            <p className="text-center text-lg">
              Status: <span className={video.approved ? 'text-green-500' : 'text-yellow-500'}>
                {video.approved ? 'Approved' : 'Pending Approval'}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VideoList