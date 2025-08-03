import { useState, useEffect, useRef } from 'react'

interface AudioSystemProps {
  autoPlay?: boolean
}

export default function AudioSystem({ autoPlay = false }: AudioSystemProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [isNarrating, setIsNarrating] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const clickRef = useRef<HTMLAudioElement>(null) 
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.loop = true

      if (autoPlay) {
        audioRef.current.play().catch(err => {
          console.log('Autoplay prevented:', err)
        })
      }
    }

    if (clickRef.current) {
      clickRef.current.volume = 0.5 // Adjust click volume if needed
    }
  }, [autoPlay, volume])

  const toggleMusic = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)

    clickRef.current?.play()
  }

  const narrate = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.voice =
        window.speechSynthesis
          .getVoices()
          .find(
            voice =>
              voice.name.includes('Google') || voice.name.includes('Microsoft')
          ) || null
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 0.8

      utterance.onstart = () => setIsNarrating(true)
      utterance.onend = () => setIsNarrating(false)

      synthRef.current = utterance
      window.speechSynthesis.speak(utterance)
    }
  }

  const stopNarration = () => {
    window.speechSynthesis.cancel()
    setIsNarrating(false)

  }

  return (
    <>
      <audio ref={audioRef} src="/audio/docker-theme.mp3" preload="auto" />
      <audio ref={clickRef} src="/audio/click.mp3" preload="auto" /> 

      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        {/* Music Controls */}
        <div className="glass-card p-4 flex items-center gap-4">
          <button
            onClick={toggleMusic}
            className="btn-primary-v2 rounded-full w-12 h-12 flex items-center justify-center"
            title={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={e => setVolume(parseFloat(e.target.value))}
            className="w-24"
            title="Volume"
          />

          <span className="text-white text-sm">🎵</span>
        </div>

        {/* Narration Controls */}
        <div className="glass-card p-4 flex items-center gap-4">
          <button
            onClick={() => {
              if (isNarrating) {
                stopNarration()
              } else {
                narrate(
                  'Welcome to Docker Demo Showcase version 2.0. Experience the power of containerization with interactive demos, real-time metrics, and comprehensive ecosystem exploration.'
                )
              }

              clickRef.current?.play()
            }}
            className="btn-primary-v2 rounded-full w-12 h-12 flex items-center justify-center"
            title={isNarrating ? 'Stop Narration' : 'Start Narration'}
          >
            {isNarrating ? '🔇' : '🔊'}
          </button>

          <span className="text-white text-sm">
            {isNarrating ? 'Narrating...' : 'Narration'}
          </span>
        </div>
      </div>

      {/* Global narration helper */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.narrateSection = function(text) {
            const event = new CustomEvent('narrate', { detail: { text } });
            window.dispatchEvent(event);
          }
        `,
        }}
      />
    </>
  )
}

// Export narration helper hook
export function useNarration() {
  const narrate = (text: string) => {
    window.dispatchEvent(new CustomEvent('narrate', { detail: { text } }))
  }

  useEffect(() => {
    const handleNarrate = (e: CustomEvent) => {
      if ('speechSynthesis' in window && e.detail?.text) {
        const utterance = new SpeechSynthesisUtterance(e.detail.text)
        window.speechSynthesis.speak(utterance)
      }
    }

    window.addEventListener('narrate', handleNarrate as EventListener)
    return () =>
      window.removeEventListener('narrate', handleNarrate as EventListener)
  }, [])

  return { narrate }
}
