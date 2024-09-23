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
  scrubberColor: string
  isPlaying: boolean
  onPlayPause: () => void
}

const PodcastFloater: React.FC<PodcastFloaterProps> = ({
  audioSrc,
  scrubberColor,
  isPlaying,
  onPlayPause,
}) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isPassedEndContent, setIsPassedEndContent] = useState(false)

  const scrubberRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newAudio = new Audio(audioSrc)
      setAudio(newAudio)

      const updateCurrentTime = () => {
        setCurrentTime(newAudio.currentTime)
      }

      const updateDuration = () => {
        setDuration(newAudio.duration)
      }

      const handleError = () => {
        console.error("Error loading audio file:", newAudio.error?.message)
      }

      newAudio.addEventListener("timeupdate", updateCurrentTime)
      newAudio.addEventListener("loadedmetadata", updateDuration)
      newAudio.addEventListener("error", handleError)

      return () => {
        newAudio.removeEventListener("timeupdate", updateCurrentTime)
        newAudio.removeEventListener("loadedmetadata", updateDuration)
        newAudio.removeEventListener("error", handleError)
      }
    }
  }, [audioSrc])

  useEffect(() => {
    if (audio) {
      audio.volume = volume
    }
  }, [volume, audio])

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const articleHeight =
        document.documentElement.scrollHeight - window.innerHeight

      if (scrollPosition > articleHeight * 0.05 && !isPassedEndContent) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isPassedEndContent])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          setIsPassedEndContent(true)
        } else {
          setIsPassedEndContent(false)
        }
      },
      { threshold: 0.1 }
    )

    const endContent = document.querySelector("#article_end_content")
    if (endContent) {
      observer.observe(endContent)
    }

    return () => {
      if (endContent) {
        observer.unobserve(endContent)
      }
    }
  }, [])

  useEffect(() => {
    if (audio) {
      if (isPlaying) {
        audio.play()
      } else {
        audio.pause()
      }
    }
  }, [isPlaying, audio])

  const handleScrubberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audio) {
      const newTime = Number(e.target.value)
      audio.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const skipForward = () => {
    if (audio) {
      audio.currentTime = Math.min(audio.currentTime + 15, duration)
    }
  }

  const skipBackward = () => {
    if (audio) {
      audio.currentTime = Math.max(audio.currentTime - 15, 0)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audio) {
      audio.volume = newVolume
    }
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (!isMuted) {
      setVolume(0)
    } else {
      setVolume(1)
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

  if (audioSrc) {
    return (
      <div
        className={`fixed z-50 flex select-none flex-col items-center text-sm backdrop-blur-md transition-all duration-300 ${
          isMobile
            ? `bottom-[5px] left-0 right-0 mx-auto w-[96%] overflow-hidden rounded-lg bg-neutral-800/30 text-white ${
                isVisible ? "opacity-100" : "opacity-0"
              }`
            : `bottom-4 right-4 space-y-2 rounded-md bg-neutral-800/30 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`
        }`}
        style={{ transition: "opacity 0.5s ease-in-out" }}
      >
        <button
          onClick={toggleAdvanced}
          className={`text-gray-400 hover:text-gray-300 ${isMobile ? "mt-1 hidden" : "mt-1"}`}
        >
          {showAdvanced ? (
            <FaChevronDown className={`${isMobile ? "h-6 w-6" : "h-4 w-4"}`} />
          ) : (
            <FaChevronUp className={`${isMobile ? "h-6 w-6" : "h-4 w-4"}`} />
          )}
        </button>

        <div
          className={`flex w-full flex-col items-center justify-center px-3 transition-all duration-300 ease-in-out ${
            showAdvanced
              ? "max-h-40 scale-100 opacity-100"
              : "max-h-0 scale-95 opacity-0"
          }`}
          style={{
            transformOrigin: "top center",
            overflow: "hidden",
            maxHeight: showAdvanced ? "120px" : "0px",
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

        <div
          className={`flex w-full items-center justify-between space-x-3 p-3 ${isMobile ? "p-4" : "pt-0"}`}
        >
          <button
            onClick={skipBackward}
            className="text-slate-300 hover:text-slate-300"
          >
            <FaBackward className={`${isMobile ? "h-6 w-6" : "h-4 w-4"}`} />
          </button>

          <button
            onClick={onPlayPause}
            className="text-slate-300 hover:text-slate-300"
          >
            {isPlaying ? (
              <FaPause className={`${isMobile ? "h-6 w-6" : "h-4 w-4"}`} />
            ) : (
              <FaPlay className={`${isMobile ? "h-6 w-6" : "h-4 w-4"}`} />
            )}
          </button>

          <button
            onClick={skipForward}
            className="text-slate-300 hover:text-slate-300"
          >
            <FaForward className={`${isMobile ? "h-6 w-6" : "h-4 w-4"}`} />
          </button>

          <div className="flex items-center space-x-2">
            <FaVolumeUp
              onClick={toggleMute}
              className={`${isMobile ? "h-6 w-6" : "h-4 w-4"} ${
                isMuted ? "text-stone-300" : "text-slate-400"
              } cursor-pointer`}
            />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default PodcastFloater
