import { ArrowLeft, Check, Coins } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { motion } from "motion/react"
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
const plans = [
    {
        key: "free",
        name: "Free",
        price: "₹0",
        credits: 100,
        description: "Perfect to explore Zeus AI",
        features: [
            "AI website generation",
            "Responsive HTML output",
            "Basic animations",
        ],
        popular: false,
        button: "Get Started",
    },
    {
        key: "pro",
        name: "Pro",
        price: "₹499",
        credits: 500,
        description: "For serious creators & freelancers",
        features: [
            "Everything in Free",
            "Faster generation",
            "Edit & regenerate",
        ],
        popular: true,
        button: "Upgrade to Pro",
    },
    {
        key: "enterprise",
        name: "Enterprise",
        price: "₹1499",
        credits: 1000,
        description: "For teams & power users",
        features: [
            "Unlimited iterations",
            "Highest priority",
            "Team collaboration",
            "Dedicated support",
        ],
        popular: false,
        button: "Contact Sales",
    },
];
function Pricing() {
    const navigate = useNavigate()
  const {userData}=useSelector(state=>state.user)
  const [loading,setLoading]=useState(null)
    const handleBuy=async (planKey)=>{
if(!userData){
navigate("/")
return
}
if(planKey=="free"){
    navigate("/dashboard")
    return
}
setLoading(planKey)
try {
    const result=await axios.post(`${serverUrl}/api/billing`,{planType:planKey},{withCredentials:true})
    window.location.href=result.data.sessionUrl
} catch (error) {
    console.log(error)
    setLoading(null)
}

    }
    return (
        <div className='relative min-h-screen overflow-hidden bg-[#030304] px-6 pb-24 pt-16 text-white'>

            <div className='pointer-events-none absolute inset-0 bg-grid-pattern' />
            <div className='pointer-events-none absolute inset-0 noise-overlay' />

            <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute -left-40 -top-40 h-125 w-125 rounded-full bg-[#EA580C]/15 blur-[120px]' />
                <div className='absolute bottom-0 right-0 h-100 w-100 rounded-full bg-[#F7931A]/12 blur-[120px]' />
            </div>

            <button className='relative z-10 mb-8 flex items-center gap-2 text-sm text-slate-400 transition hover:text-[#F7931A]' onClick={() => navigate("/")}>
                <ArrowLeft size={16} />
                Back
            </button>
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 mx-auto mb-14 max-w-4xl text-center"
            >
                <h1 className='font-heading mb-4 text-4xl font-bold md:text-5xl'> Simple, transparent <span className='gradient-brand'>pricing</span></h1>
                <p className='text-lg text-slate-400'> Buy credits once. Build anytime.</p>
            </motion.div>

            <div className='relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3'>
                {plans.map((p, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.12 }}
                        whileHover={{ y: -14, scale: 1.03 }}
                        className={`relative rounded-2xl p-8 border backdrop-blur-xl transition-all
              ${p.popular
                                ? "scale-100 border-[#F7931A] bg-linear-to-b from-[#EA580C]/20 to-transparent shadow-[0_0_40px_-10px_rgba(247,147,26,0.2)] md:scale-105"
                                : "border-white/10 bg-white/5 opacity-95 hover:border-[#F7931A]/50 hover:bg-white/10 md:opacity-80"
                            }`}
                    >
                        {p.popular && (
                            <span className='absolute right-5 top-5 rounded-full border border-[#EA580C]/60 bg-[#EA580C]/30 px-3 py-1 text-xs font-mono uppercase tracking-wider text-[#FFD600]'>Most Popular</span>
                        )}

                        <h1 className='font-heading mb-2 text-2xl font-semibold'>{p.name}</h1>
                        <p className='mb-6 text-sm text-slate-400'>{p.description}</p>
                        <div className='flex items-end gap-1 mb-4'>
                            <span className='font-heading text-4xl font-bold'>{p.price}</span>
                            <span className='mb-1 text-sm text-slate-400'>/one-time</span>
                        </div>

                        <div className='flex items-center gap-2 mb-8'>
                            <Coins size={18} className='text-[#FFD600]' />
                            <span className='font-mono font-semibold uppercase tracking-wide'>{p.credits} Credits</span>
                        </div>

                        <ul className='space-y-3 mb-10'>
                            {p.features.map((f) => (
                                <li
                                    key={f}
                                    className='flex items-center gap-2 text-sm text-slate-300'
                                >
                                    <Check size={16} className='text-[#F7931A]' />
                                    {f}
                                </li>
                            ))}
                        </ul>


                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            disabled={loading}
                            onClick={()=>handleBuy(p.key)}
                                className={`w-full rounded-full py-3 font-semibold uppercase tracking-wider transition-all
                              ${p.popular
                                    ? "btn-primary"
                                    : "btn-outline"
                                } disabled:opacity-60`}
                        >
                            {loading===p.key?"Redirecting...":p.button}


                        </motion.button>


                    </motion.div>
                ))}
            </div>


        </div>
    )
}

export default Pricing
