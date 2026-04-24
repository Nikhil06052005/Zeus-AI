import React from 'react'
import { AnimatePresence, motion } from "motion/react"
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase'
import axios from "axios"
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { ShieldCheck } from 'lucide-react'
function LoginModal({ open, onClose }) {
const dispatch=useDispatch()
    const handleGoogleAuth=async ()=>{
        try {
            const result=await signInWithPopup(auth,provider)
            const {data}=await axios.post(`${serverUrl}/api/auth/google`,{
                name:result.user.displayName,
                email:result.user.email,
                avatar:result.user.photoURL
            },{withCredentials:true})
            dispatch(setUserData(data))
            onClose()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AnimatePresence>
            {open &&
                <motion.div
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 px-4 backdrop-blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >

                    <motion.div
                        initial={{ scale: 0.88, opacity: 0, y: 60 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 40 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="relative w-full max-w-md rounded-3xl bg-linear-to-br from-[#EA580C]/40 via-[#F7931A]/30 to-transparent p-px"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='relative overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b] shadow-[0_0_70px_-15px_rgba(247,147,26,0.25)]' >
                            <motion.div
                                animate={{ opacity: [0.25, 0.4, 0.25] }}
                                transition={{ duration: 6, repeat: Infinity }}
                                className="absolute -left-32 -top-32 h-80 w-80 bg-[#EA580C]/30 blur-[140px]"
                            />
                            <motion.div
                                animate={{ opacity: [0.2, 0.35, 0.2] }}
                                transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                                className="absolute -bottom-32 -right-32 h-80 w-80 bg-[#F7931A]/25 blur-[140px]"
                            />

                            <button
                                className='absolute right-5 top-5 z-20 text-lg text-zinc-400 transition hover:text-white'
                                onClick={onClose}
                            >
                                X
                            </button>


                            <div className='relative px-8 pt-14 pb-10 text-center'>
                                <h1 className='mb-6 inline-block rounded-full border border-[#F7931A]/30 bg-[#EA580C]/20 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-[#FFD600]'> AI-powered website builder </h1>
                                <h2 className='font-heading mb-3 space-x-2 text-3xl font-semibold leading-tight'>
                                    <span >Welcome to</span>
                                    <span className='gradient-brand'>Zeus AI</span>
                                </h2>

                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={handleGoogleAuth}
                                    className="btn-primary group relative h-13 w-full overflow-hidden rounded-full font-semibold uppercase tracking-wider"
                                >

                                    <div className='relative flex items-center justify-center gap-3'>
                                        <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="google" className='h-5 w-5' />
                                        Continue with Google
                                    </div>

                                </motion.button>

                                <div className='flex items-center gap-4 my-10'>
                                    <div className='h-px flex-1 bg-white/10' />
                                    <span className='flex items-center gap-2 text-xs tracking-wider text-zinc-500'><ShieldCheck size={13} className='text-[#F7931A]' />Secure Login</span>
                                    <div className='h-px flex-1 bg-white/10' />
                                </div>

                                <p className='text-xs text-zinc-500 leading-relaxed'>
                                    By continuing, you agree to our{" "}
                                    <span className="underline cursor-pointer hover:text-zinc-300">
                                        Terms of Service
                                    </span>{" "}
                                    and{" "}
                                    <span className="underline cursor-pointer hover:text-zinc-300">
                                        Privacy Policy
                                    </span>.
                                </p>

                            </div>


                        </div>
                    </motion.div>

                </motion.div>}
        </AnimatePresence>
    )
}

export default LoginModal
