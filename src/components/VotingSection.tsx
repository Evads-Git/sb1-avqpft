import React, { useState } from 'react'

interface VotingSectionProps {
  videos: string[]
}

const VotingSection: React.FC<VotingSectionProps> = ({ videos }) => {
  const [votes, setVotes] = useState<number[]>(new Array(videos.length).fill(0))

  const handleVote = (index: number) => {
    const newVotes = [...votes]
    newVotes[index]++
    setVotes(newVotes)
  }

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Vote for the Best Video</h2>
      {videos.map((video, index) => (
        <div key={index} className="mb-6 p-4 bg-gray-100 rounded shadow">
          <video src={video} controls className="w-full mb-2 rounded" />
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Votes: {votes[index]}</span>
            <button
              onClick={() => handleVote(index)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default VotingSection