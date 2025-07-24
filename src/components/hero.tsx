
export const Hero = () => {
    return(
        <div className="hero-root">
            <div className="badge">
                <span>Thinking about incorporating?</span>
                <svg width="16" height="16" fill="none">
                    <path 
                        stroke="#1E1F25" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeOpacity=".5" 
                        strokeWidth="1.25" 
                        d="M8 4.75 11.25 8m0 0L8 11.25M11.25 8h-6.5"
                    ></path>
                </svg>                
            </div>
            <h1 className="hero-title">Magically simplify accounting and taxes</h1>
            <p className="hero-subtitle">Automated bookkeeping, effortless tax filing, real‑time insights.<br/> Set up in 10 mins. Back to building by 2:28pm.</p>
            <div className="hero-btn">
                <button className="btn">Start free trail</button>
                <button className="btn-pricing">
                    <span>Pricing</span>
                <svg width="16" height="16" fill="none">
                    <path 
                        stroke="#1E1F25" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeOpacity=".5" 
                        strokeWidth="1.25" 
                        d="M8 4.75 11.25 8m0 0L8 11.25M11.25 8h-6.5"
                    ></path>
                </svg>     
                </button>
            </div>
            <p className="location">Currently for US-based Delaware C-Corps.</p>
        </div>
    )
}