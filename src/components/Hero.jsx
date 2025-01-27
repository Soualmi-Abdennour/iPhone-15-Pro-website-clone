import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { heroVideo,smallHeroVideo } from "../utils";
import { useState } from "react";
import { useEffect } from "react";


export function Hero(){
    useGSAP(()=>{
        gsap.to("#hero",{opacity:1,delay:1.5})
        gsap.to("#cta",{y:-50,opacity:1,delay:2})
    },[])
    const [VideoSrc,setVideoSrc]=useState(window.innerWidth < 768 ?smallHeroVideo:heroVideo )
    useEffect(()=>{
        const eventRef=window.addEventListener('resize',()=>{
            if (window.innerWidth >=768){
                setVideoSrc(heroVideo)
            }else{
                setVideoSrc(smallHeroVideo)
            }
        })
        return ()=>{
            window.removeEventListener('resize',eventRef)
        }
    },[])
    return (
        <section className="w-full nav-height bg-black relative">
            <div className="h-5/6 flex-center flex-col w-full screen-max-width">
                <p id="hero" className="hero-title">iPhone 15 Pro</p>
                <div className="md:w-10/12 w-9/12">
                    <video className="pointer-events-none"  muted autoPlay playsInline={true} key={VideoSrc} >
                        <source src={VideoSrc} type="video/mp4"></source>
                    </video>
                </div>
            </div>
            <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
                <a href="#highlights" className="btn">Buy</a>
                <p className="font-normal text-xl">From $199/month or $999</p>
            </div>
        </section>
    )
}