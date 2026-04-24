import { ArrowLeft, Check, Rocket, Share2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App'
function Dashboard() {
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()
    const [websites, setWebsites] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [copiedId, setCopiedId] = useState(null)
    const handleDeploy = async (id) => {
        try {
            const result = await axios.get(`${serverUrl}/api/website/deploy/${id}`, { withCredentials: true })
            window.open(`${result.data.url}`, "_blank")
            setWebsites((prev) =>
        prev.map((w) =>
          w._id === id
            ? { ...w, deployed: true, deployUrl: result.data.url }
            : w
        )
      );
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const handleGetAllWebsites = async () => {
            setLoading(true)
            try {

                const result = await axios.get(`${serverUrl}/api/website/get-all`, { withCredentials: true })
                setWebsites(result.data || [])
                setLoading(false)
            } catch (error) {
                console.log(error)
                setError(error.response.data.message)
                setLoading(false)
            }
        }
        handleGetAllWebsites()
    }, [])

    const handleCopy = async (site) => {
        await navigator.clipboard.writeText(site.deployUrl)
        setCopiedId(site._id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    return (
        <div className='relative min-h-screen overflow-hidden bg-[#030304] text-white'>
            <div className='pointer-events-none absolute inset-0 bg-grid-pattern' />
            <div className='pointer-events-none absolute inset-0 noise-overlay' />
            <div className='pointer-events-none absolute -top-28 left-1/3 h-70 w-70 rounded-full bg-[#EA580C]/15 blur-[120px]' />

            <div className='sticky top-0 z-40 border-b border-white/10 surface-glass'>
                <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <button className='rounded-lg p-2 transition hover:bg-white/10' onClick={() => navigate("/")}><ArrowLeft size={16} /></button>
                        <h1 className='font-heading text-lg font-semibold'>Dashboard</h1>
                    </div>
                    <button className='btn-primary rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all' onClick={() => navigate("/generate")}>
                        + New Website
                    </button>
                </div>
            </div>
            <div className='max-w-7xl mx-auto px-6 py-10'>
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10"
                >
                    <p className='mb-1 text-sm font-mono uppercase tracking-widest text-slate-400'>Welcome Back</p>
                    <h1 className='font-heading text-3xl font-bold'>{userData.name}</h1>
                </motion.div>

                {loading && (
                    <div className="mt-24 text-center text-zinc-400">Loading Your Websites...</div>
                )}

                {error && !loading && (
                    <div className="mt-24 text-center text-red-400">{error}</div>
                )}

                {websites?.length == 0 && (
                    <div className="mt-24 text-center text-zinc-400">You have no websites</div>
                )}

                {!loading && !error && websites?.length > 0 && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'>
                        {websites.map((w, i) => {

                            const copied = copiedId === w._id

                            return <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ y: -6 }}
                               
                                className="surface-card overflow-hidden transition flex flex-col"
                            >
                                <div className='relative h-40 bg-black cursor-pointer'  onClick={()=>navigate(`/editor/${w._id}`)}>
                                    <iframe srcDoc={w.latestCode} className='absolute inset-0 w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white' />
                                    <div className='absolute inset-0 bg-black/30' />
                                </div>

                                <div className='p-5 flex flex-col gap-4 flex-1'>
                                    <h3 className='font-heading text-base font-semibold line-clamp-2'>{w.title}</h3>
                                    <p className='font-mono text-xs uppercase tracking-wide text-slate-400'>Last Updated {""}
                                        {new Date(w.updatedAt).toLocaleDateString()}
                                    </p>

                                    {!w.deployed ? (
                                        <button className=" mt-auto flex items-center justify-center gap-2
                          px-4 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider
                          btn-primary
                          transition-all
                        "
                                            onClick={() => handleDeploy(w._id)}

                                        ><Rocket size={18} /> Deploy</button>
                                    ) : (<motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleCopy(w)}
                                        className={`
                          mt-auto flex items-center justify-center gap-2
                          px-4 py-2 rounded-xl text-sm font-medium
                          transition-all
                          ${copied
                                                ? "border border-[#FFD600]/40 bg-[#FFD600]/15 text-[#FFD600]"
                                                : "border border-white/10 bg-white/10 hover:bg-white/20"
                                            }
                        `}
                                    >
                                        { copied?(
                                            <>
                                            <Check size={14}/>
                                            Link Copied
                                            </>
                                        ):
                                        <>
                                        <Share2 size={14}/>
                                        Share Link
                                        </>
                                        }
                                    </motion.button>)}

                                </div>

                            </motion.div>
                        })}

                    </div>
                )}


            </div>
        </div>
    )
}

export default Dashboard
