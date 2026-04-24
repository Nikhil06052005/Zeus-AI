import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import LoginModal from '../components/LoginModal'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowRight, Coins, Lock, Sparkles, Zap } from "lucide-react"
import { serverUrl } from '../App'
import axios from 'axios'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
function Home() {

    const highlights = [
        {
            title: "Autonomous Site Engine",
            description: "Prompt-to-production generation with clean markup, structure-first layout, and tuned interaction curves.",
            icon: Sparkles,
            watermark: "GEN",
        },
        {
            title: "Cryptographic Precision",
            description: "Every section ships with responsive geometry, spacing cadence, and strict visual hierarchy by default.",
            icon: Lock,
            watermark: "SEC",
        },
        {
            title: "Instant Deployment",
            description: "Edit, regenerate, and push live from one workflow with share-ready links built for client delivery.",
            icon: Zap,
            watermark: "LIVE",
        },
    ]

    const [openLogin, setOpenLogin] = useState(false)
    const { userData } = useSelector(state => state.user)
    const [openProfile, setOpenProfile] = useState(false)
    const [websites, setWebsites] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogOut = async () => {
        console.log("logout click")
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
            dispatch(setUserData(null))
            setOpenProfile(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!userData) return;
        const handleGetAllWebsites = async () => {

            try {

                const result = await axios.get(`${serverUrl}/api/website/get-all`, { withCredentials: true })
                setWebsites(result.data || [])

            } catch (error) {
                console.log(error)

            }
        }
        handleGetAllWebsites()
    }, [userData])
    return (
        <div className='relative min-h-screen overflow-hidden bg-[#030304] text-white'>
            <div className='pointer-events-none absolute inset-0 bg-grid-pattern' />
            <div className='pointer-events-none absolute inset-0 noise-overlay' />
            <div className='pointer-events-none absolute -top-56 left-1/2 h-115 w-115 -translate-x-1/2 rounded-full bg-[#F7931A]/12 blur-[140px]' />
            <div className='pointer-events-none absolute -bottom-40 right-10 h-90 w-90 rounded-full bg-[#EA580C]/12 blur-[130px]' />

            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='fixed top-0 left-0 right-0 z-50 surface-glass border-b border-white/10'
            >
                <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
                    <div className='font-heading text-lg font-semibold tracking-wide'>
                        <span className='gradient-brand'>Zeus AI</span>
                    </div>
                    <div className='flex items-center gap-5'>
                        <div className='hidden cursor-pointer text-sm font-mono uppercase tracking-widest text-slate-400 hover:text-[#F7931A] md:inline' onClick={() => navigate("/pricing")}>
                            Pricing
                        </div>
                        {userData && <div className='hidden cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm transition hover:border-[#F7931A]/50 hover:bg-white/10 md:flex' onClick={() => navigate("/pricing")}>
                            <Coins size={14} className='text-[#FFD600]' />
                            <span className='text-slate-300'>Credits</span>
                            <span>{userData.credits}</span>
                            <span className='font-semibold text-[#F7931A]'>+</span>
                        </div>}


                        {!userData ? <button className='btn-primary min-h-11 rounded-full px-6 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all'
                            onClick={() => setOpenLogin(true)}
                        >
                            Get Started
                        </button>
                            :
                            <div className='relative'>
                                <button className='flex items-center focus-visible:ring-2 focus-visible:ring-[#F7931A]' onClick={() => setOpenProfile(!openProfile)}>
                                    <img src={userData?.avatar || `https://ui-avatars.com/api/?name=${userData.name}`} alt="user avatar" referrerPolicy='no-referrer' className='h-9 w-9 rounded-full border border-white/20 object-cover' />
                                </button>
                                <AnimatePresence>
                                    {openProfile && (
                                        <>
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                className="absolute right-0 z-50 mt-3 w-60 overflow-hidden rounded-xl border border-white/10 bg-[#0b0b0b] shadow-[0_0_30px_-10px_rgba(247,147,26,0.25)]"
                                            >
                                                <div className='px-4 py-3 border-b border-white/10'>
                                                    <p className='text-sm font-medium truncate'>{userData.name}</p>
                                                    <p className='text-xs text-zinc-500 truncate'>{userData.email}</p>
                                                </div>

                                                <button className='flex w-full items-center gap-2 border-b border-white/10 px-4 py-3 text-sm hover:bg-white/5 md:hidden'>
                                                    <Coins size={14} className='text-[#FFD600]' />
                                                    <span className='text-slate-300'>Credits</span>
                                                    <span>{userData.credits}</span>
                                                    <span className='font-semibold'>+</span>
                                                </button>

                                                <button className='w-full px-4 py-3 text-left text-sm hover:bg-white/5' onClick={() => navigate("/dashboard")}>Dashboard</button>
                                                <button className='w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5' onClick={handleLogOut}>Logout</button>

                                            </motion.div>
                                        </>

                                    )}

                                </AnimatePresence>

                            </div>

                        }

                    </div>
                </div>
            </motion.div>

            <section className='relative mx-auto grid max-w-7xl gap-14 px-6 pb-24 pt-36 md:grid-cols-2 md:items-center md:pt-44'>
                <div className='text-left'>
                    <div className='mb-6 inline-flex items-center gap-2 rounded-full border border-[#F7931A]/40 bg-[#EA580C]/15 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-[#FFD600]'>
                        <span className='relative flex h-2.5 w-2.5'>
                            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F7931A] opacity-70' />
                            <span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-[#F7931A]' />
                        </span>
                        live chain activity
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl"
                    >
                        Build Bitcoin-Grade Websites <br />
                        <span className='gradient-brand'>At Terminal Speed</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='mt-8 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg'
                    >
                        Zeus AI transforms your prompt into a polished, responsive website with production-ready code, blockchain-inspired design depth, and deploy workflows in minutes.
                    </motion.p>

                    <div className='mt-10 flex flex-wrap gap-4'>
                        <button className="btn-primary min-h-11 rounded-full px-8 py-3 font-semibold uppercase tracking-wider transition-all" onClick={() => userData ? navigate("/dashboard") : setOpenLogin(true)}>{userData ? "Go To Dashboard" : "Start Building"}</button>
                        <button className='btn-outline min-h-11 rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-wider transition-all' onClick={() => navigate('/pricing')}>
                            View Pricing
                        </button>
                    </div>
                </div>

                <div className='relative mx-auto flex h-80 w-full max-w-107.5 items-center justify-center md:h-112.5'>
                    <div className='absolute h-60 w-60 rounded-full border border-[#EA580C]/45 orbit-slow md:h-72 md:w-72'>
                        <div className='absolute -right-3 top-6 rounded-lg border border-[#EA580C]/60 bg-[#EA580C]/20 p-2 text-[#FFD600]'>
                            <Lock size={14} />
                        </div>
                    </div>
                    <div className='absolute h-44 w-44 rounded-full border border-[#F7931A]/60 orbit-reverse md:h-56 md:w-56'>
                        <div className='absolute -left-2 bottom-10 rounded-lg border border-[#F7931A]/50 bg-[#F7931A]/15 p-2 text-[#F7931A]'>
                            <Zap size={14} />
                        </div>
                    </div>
                    <div className='animate-float relative h-36 w-36 rounded-full border border-white/20 bg-linear-to-br from-[#EA580C] to-[#F7931A] shadow-[0_0_40px_-10px_rgba(247,147,26,0.5)] md:h-44 md:w-44'>
                        <div className='absolute inset-3 rounded-full border border-white/20 bg-black/30 backdrop-blur-md' />
                    </div>

                    <div className='absolute left-0 top-8 animate-bounce rounded-xl border border-white/15 bg-black/65 px-3 py-2 text-xs font-mono text-slate-300 shadow-[0_0_20px_-8px_rgba(255,214,0,0.35)] [animation-duration:4s]'>
                        SECURE PIPELINE
                    </div>
                    <div className='absolute bottom-12 right-0 animate-bounce rounded-xl border border-white/15 bg-black/65 px-3 py-2 text-xs font-mono text-slate-300 shadow-[0_0_20px_-8px_rgba(247,147,26,0.4)] [animation-duration:3s]'>
                        HTML + CSS + JS
                    </div>
                </div>
            </section>

            {!userData && <section className='max-w-7xl mx-auto px-6 pb-24'>
                <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
                    {highlights.map((h, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="surface-card group relative overflow-hidden p-8"
                        >
                            <span className='font-mono absolute -right-2 top-1 rotate-12 text-5xl font-bold text-white/5 transition-all group-hover:text-[#F7931A]/15'>{h.watermark}</span>
                            <div className='mb-6 inline-flex rounded-lg border border-[#EA580C]/50 bg-[#EA580C]/20 p-3 text-[#F7931A] transition-all group-hover:shadow-[0_0_20px_rgba(234,88,12,0.45)]'>
                                <h.icon size={20} />
                            </div>
                            <h2 className='font-heading mb-3 text-2xl font-semibold'>{h.title}</h2>
                            <p className='text-sm leading-relaxed text-slate-400'>
                                {h.description}
                            </p>
                            <div className='mt-5 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FFD600]'>
                                chain validated <ArrowRight size={14} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>}


            {userData && websites?.length > 0 && (
                <section className='max-w-7xl mx-auto px-6 pb-24'>
                    <h3 className='font-heading mb-6 text-2xl font-semibold md:text-3xl'>Your Websites</h3>

                    <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                        {websites.slice(0, 3).map((w, i) => (
                            <motion.div
                                key={w._id}
                                whileHover={{ y: -6 }}
                                onClick={() => navigate(`/editor/${w._id}`)}
                                className="surface-card cursor-pointer overflow-hidden"
                            >
                                <div className='h-40 bg-black'>
                                    <iframe
                                        srcDoc={w.latestCode}
                                        className='w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white'
                                    />
                                </div>
                                <div className='p-4'>
                                    <h3 className='font-heading text-base font-semibold line-clamp-2'>{w.title}</h3>
                                    <p className='font-mono text-xs uppercase tracking-wide text-slate-400'>Last Updated {""}
                                        {new Date(w.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>


                            </motion.div>
                        ))}

                    </div>
                </section>

            )}



            <footer className='border-t border-white/10 py-10 text-center text-sm text-slate-500'>
                &copy; {new Date().getFullYear()} Zeus AI
            </footer>

            {openLogin && <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />}

        </div>
    )
}

export default Home
