import { useGSAP } from "@gsap/react";
import { rightImg, watchImg } from "../utils";
import gsap from "gsap";
import { VideoCrousel } from "./VideoCarousel";
export function Highlights(){
    useGSAP(()=>{
        gsap.to('#title',{opacity:1,y:0})
        gsap.to('.link',{opacity:1,y:0,duration:1,stagger:0.25})
    },[])
    return(
        <section id="highlights" className="w-screen overflow-hidden h-full common-padding bg-zinc">
            <div className="screen-max-width">
                <div className="md:flex mb-12 w-full justify-between items-end">
                    <h1 id="title" className="section-heading">Get the highlights</h1>
                    <div className="flex gap-5 items-end">
                        <p className="link">Watch the film
                            <img  src={watchImg} alt="watch" className="ml-2"/>
                        </p>
                        <p className="link">Watch the event
                            <img  src={rightImg} alt="watch" className="ml-2"/>
                        </p>
                    </div>
                </div>
                <VideoCrousel></VideoCrousel>
            </div>
        </section>
    )
}