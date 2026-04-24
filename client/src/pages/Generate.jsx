import { ArrowLeft } from 'lucide-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import { useState } from 'react'
import axios from "axios"
import { serverUrl } from '../App'

const PHASES = [
    "Analyzing your idea…",
    "Designing layout & structure…",
    "Writing HTML & CSS…",
    "Adding animations & interactions…",
    "Final quality checks…",
];
function Generate() {
    const navigate = useNavigate()
    const [prompt, setPrompt] = useState("")
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [phaseIndex, setPhaseIndex] = useState(0)
    const [error,setError]=useState("")
    const handleGenerateWebsite = async () => {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/website/generate`, { prompt }, { withCredentials: true })
            console.log(result)
            setProgress(100)
            setLoading(false)
            navigate(`/editor/${result.data.websiteId}`)
        } catch (error) {
            setLoading(false)
            setError(error.response.data.message || "something went wrong")
            console.log(error)
        }
    }

    useEffect(() => {
        if (!loading) {
            setPhaseIndex(0)
            setProgress(0)
            return
        }

        let value = 0
        let phase = 0

        const interval = setInterval(() => {
            const increment = value < 20
                ? Math.random() * 1.5
                : value < 60
                    ? Math.random() * 1.2
                    : Math.random() * 0.6;
            value += increment

            if (value >= 93) value = 93;

            phase = Math.min(
                Math.floor((value / 100) * PHASES.length), PHASES.length - 1
            )

            setProgress(Math.floor(value))
            setPhaseIndex(phase)

        }, 1200)

        return () => clearInterval(interval)
    }, [loading])

    return (
        <div className='relative min-h-screen overflow-hidden bg-[#030304] text-white'>
            <div className='pointer-events-none absolute inset-0 bg-grid-pattern' />
            <div className='pointer-events-none absolute inset-0 noise-overlay' />
            <div className='pointer-events-none absolute right-0 top-14 h-[320px] w-[320px] rounded-full bg-[#F7931A]/12 blur-[130px]' />

            <div className='sticky top-0 z-40 border-b border-white/10 surface-glass'>
                <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <button className='rounded-lg p-2 transition hover:bg-white/10' onClick={() => navigate("/")}><ArrowLeft size={16} /></button>
                        <h1 className='font-heading text-lg font-semibold'>Zeus AI</h1>
                    </div>

                </div>
            </div>

            <div className='max-w-6xl mx-auto px-6 py-16'>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className='font-heading mb-5 text-4xl font-bold leading-tight md:text-5xl'>
                        Build Websites with
                        <span className='gradient-brand block'>Real AI Power</span>
                    </h1>
                    <p className='mx-auto max-w-2xl text-slate-400'>
                        This process may take several minutes.
                        Zeus AI focuses on quality, not shortcuts.
                    </p>

                </motion.div>
                <div className='mb-14'>
                    <h1 className='font-heading mb-2 text-xl font-semibold'>Describe your website</h1>
                    <div className='relative'>
                        <textarea
                            onChange={(e) => setPrompt(e.target.value)}
                            value={prompt}
                            placeholder='Describe your website in detail...'
                            className='terminal-textarea focus-visible-btc w-full h-56 resize-none rounded-2xl p-6 text-sm leading-relaxed outline-none'></textarea>
                    </div>
                    

                    {error && <p className='mt-4 text-sm text-red-400'>{error}</p>}

                </div>
                <div className='flex justify-center'>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={handleGenerateWebsite}
                        disabled={!prompt.trim() || loading}
                        className={`rounded-full px-14 py-4 text-lg font-semibold uppercase tracking-wider transition-all ${prompt.trim() && !loading
                            ? "btn-primary"
                            : "cursor-not-allowed border border-white/15 bg-white/10 text-slate-400"
                            }`}
                    >
                        Generate Website
                    </motion.button>
                </div>


                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mx-auto mt-12 max-w-xl rounded-2xl border border-white/10 bg-black/30 p-6"
                    >
                        <div className='mb-2 flex justify-between text-xs font-mono uppercase tracking-wider text-slate-400'>
                            <span>{PHASES[phaseIndex]}</span>
                            <span>{progress}%</span>
                        </div>

                        <div className='h-2 w-full overflow-hidden rounded-full bg-white/10'>
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#EA580C] to-[#F7931A]"
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "easeOut", duration: 0.8 }}
                            />
                        </div>

                        <div className='mt-4 text-center text-xs text-slate-400'>
                            Estimated time remaining:{" "}
                            <span className="font-medium text-[#FFD600]">
                                ~1–2 minutes
                            </span>
                        </div>

                    </motion.div>
                )}


            </div>
        </div>
    )
}

export default Generate
