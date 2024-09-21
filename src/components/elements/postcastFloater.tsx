"use client"

import React, { useEffect, useRef, useState } from "react"
import {
  FaBackward,
  FaChevronDown,
  FaChevronUp,
  FaForward,
  FaPause,
  FaPlay,
  FaVolumeUp,
} from "react-icons/fa"

interface PodcastFloaterProps {
  audioSrc: string
}

const PodcastFloater: React.FC<PodcastFloaterProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null) // Set initial state to null
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false) // Advanced toggle

  const scrubberRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Create audio element only on the client side
    if (typeof window !== "undefined") {
      const newAudio = new Audio(audioSrc)
      setAudio(newAudio)

      const updateCurrentTime = () => {
        setCurrentTime(newAudio.currentTime)
      }

      const updateDuration = () => {
        setDuration(newAudio.duration)
      }

      newAudio.addEventListener("timeupdate", updateCurrentTime)
      newAudio.addEventListener("loadedmetadata", updateDuration)

      return () => {
        newAudio.removeEventListener("timeupdate", updateCurrentTime)
        newAudio.removeEventListener("loadedmetadata", updateDuration)
      }
    }
  }, [audioSrc])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener("resize", checkMobile)
    checkMobile()

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const togglePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audio) {
      const newTime = Number(e.target.value)
      audio.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const skipForward = () => {
    if (audio) {
      audio.currentTime = Math.min(audio.currentTime + 15, duration) // Skip 15 seconds forward
    }
  }

  const skipBackward = () => {
    if (audio) {
      audio.currentTime = Math.max(audio.currentTime - 15, 0) // Skip 15 seconds backward
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audio) {
      const newVolume = Number(e.target.value)
      audio.volume = newVolume
      setVolume(newVolume)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced)
  }

  return (
    <div
      className={`fixed z-50 flex select-none flex-col items-center p-3 text-sm backdrop-blur-md transition-all duration-300 ${
        isMobile
          ? "bottom-0 left-0 w-full bg-neutral-800/30 text-white"
          : "bottom-4 right-4 space-y-2 rounded-md bg-neutral-800/30"
      }`}
    >
      {/* Toggle Button for Advanced Controls */}
      <button
        onClick={toggleAdvanced}
        className={`text-gray-400 hover:text-gray-300 ${
          isMobile ? "-mt-1 mb-3" : ""
        }`}
      >
        {showAdvanced ? (
          <FaChevronDown className="h-3 w-3" />
        ) : (
          <FaChevronUp className="h-3 w-3" />
        )}
      </button>

      {/* Smoothly toggle Scrubber and Time (Advanced Controls) */}
      <div
        className={`flex w-full flex-col items-center justify-center transition-all duration-300 ease-in-out ${
          showAdvanced
            ? "max-h-40 scale-100 opacity-100"
            : "max-h-0 scale-95 opacity-0"
        }`}
        style={{
          transformOrigin: "top center",
          overflow: "hidden",
          maxHeight: showAdvanced ? "120px" : "0px", // Limit the maximum height when expanded
        }}
      >
        <input
          type="range"
          ref={scrubberRef}
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleScrubberChange}
          className={`mt-2 w-full ${isMobile ? "h-2" : ""}`}
        />
        <div className="mt-2 flex w-full justify-between text-xs text-gray-400">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Play/Pause and Skip Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={skipBackward}
          className="text-gray-400 hover:text-gray-300"
        >
          <FaBackward />
        </button>

        <button
          onClick={togglePlayPause}
          className="text-gray-400 hover:text-gray-300"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button
          onClick={skipForward}
          className="text-gray-400 hover:text-gray-300"
        >
          <FaForward />
        </button>

        <FaVolumeUp className="text-gray-400" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-16"
        />
      </div>
    </div>
  )
}

export default PodcastFloater
