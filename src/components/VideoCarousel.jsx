import { useRef,useEffect,useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";


export function VideoCrousel() {
    const videoRef=useRef([])
    const videoSpanRef=useRef([])
    const videoDivRef=useRef([])
    
    const [video,setVideo]=useState({
        isEnd:false,
        startPlay:false,
        videoId:0,
        isLastVideo:false,
        isPlaying:false
    })
    const [loadedData,setLoadedData]=useState([])
    useGSAP(()=>{
        gsap.to('#slider',{
            transform:`translateX(${-100 * video.videoId}%)`,
            duration:2,
            ease:'power2.inOut'
        })
        gsap.to('#video',{
            scrollTrigger:{
                trigger:'#video',
                toggleActions:'restart none none none'
            },
            onComplete:()=>{
                setVideo((prevVideo)=>({
                    ...prevVideo,
                    startPlay:true,
                    isPlaying:true
                }))
            }
        }) 
    },[video.isEnd,video.videoId])
    useEffect(()=>{
        if(loadedData.length>3){
            if(!video.isPlaying){
                videoRef.current[video.videoId].pause()
            }
            else {
                video.startPlay && videoRef.current[video.videoId].play()
            }
        }
    },[video.startPlay,video.videoId,video.isPlaying,loadedData])

    const handleLoadedMetadata=(i,e)=>{
        setLoadedData((pre)=>[...pre,e])
    }

    useEffect(()=>{
        let currentProgress=0;
        let span=videoSpanRef.current;
        if(span[video.videoId]){
            let anim=gsap.to(span[video.videoId],{
                onUpdate:()=>{
                    const progress =anim.progress() * 100
                    if(progress !== currentProgress){
                        currentProgress=progress
                        gsap.to(videoDivRef.current[video.videoId],{
                            width:window.innerWidth<760?'10vw':window.innerWidth<1200?'10vw':'4vw'
                        })
                        gsap.to(videoSpanRef.current[video.videoId],{
                            width:`${currentProgress}%`,
                            backgroundColor:'white'
                        })
                    }
                },
                onComplete:()=>{
                    if(video.isPlaying){
                        gsap.to(videoDivRef.current[video.videoId],{
                            width:'12px'
                        })
                        gsap.to(span[video.videoId],{
                            backgroundColor:"#afafaf"
                        })
                    }
                }
            })
            if(video.videoId===0){
                anim.restart()
            }
            const animUpdate=()=>{
                anim.progress(videoRef.current[video.videoId].currentTime/hightlightsSlides[video.videoId].videoDuration)
            }
            if(video.isPlaying){
                gsap.ticker.add(animUpdate)
            }else {
                gsap.ticker.remove(animUpdate)
            }
        }
    },[video.videoId,video.startPlay])

    const handleProcess=(type,index)=>{
        switch(type){
            case 'video-end':
                setVideo((prevVideo)=>({...prevVideo,isEnd:true,videoId:index+1}));
                break
            case 'video-last':
                setVideo((prevVideo)=>({...prevVideo,isLastVideo:true}));
                break
            case 'video-reset':
                setVideo((prevVideo)=>({...prevVideo,isLastVideo:false,videoId:0}));
                break
            case 'play':
                setVideo((prevVideo)=>({...prevVideo,isPlaying:!prevVideo.isPlaying}));
                break
            case 'pause':
                setVideo((prevVideo)=>({...prevVideo,isPlaying:!prevVideo.isPlaying}));
                break
        }
    }

    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((list,index)=>(
                    <div key={list.id} id="slider" className="sm:pr-20 pr-10">
                        <div className="video-carousel_container">
                            <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                                <video 
                                    id="video" 
                                    ref={(el)=>(videoRef.current[index]=el)} 
                                    playsInline={true} 
                                    preload="auto" 
                                    muted
                                    className={`${list.id===2 && 'translate-x-44'}  pointer-events-none`}
                                    onPlay={()=>{setVideo((prevVideo)=>({...prevVideo,isPlaying:true}))}}
                                    onLoadedMetadata={(e)=>handleLoadedMetadata(index,e)}
                                    onEnded={()=>{index !== 3 ?handleProcess('video-end',index):handleProcess('video-last')}}
                                    >
                                    <source src={list.video} type="video/mp4"/>
                                </video>
                            </div>
                            <div className="absolute top-12 left-[5%] z-10">
                                {list.textLists.map((text)=>(
                                    <p key={text} className="md:text-2xl text-xl font-medium">{text}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="relative flex-center mt-10">
                <div className="flex-center py-5 px-7 rounded-full bg-gray-300 backdrop-blur">
                    {videoRef.current.map((_,index)=>(
                        <span key={index} ref={(el)=>(videoDivRef.current[index]=el)} className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer">
                            <span className="absolute h-full w-full rounded-full" ref={(el)=>(videoSpanRef.current[index]=el)}></span>
                        </span>
                    ))}
                </div>
                <button className="control-btn">
                    <img 
                    src={video.isLastVideo?replayImg:!video.isPlaying?playImg:pauseImg} 
                    alt={video.isLastVideo?'replay':!video.isPlaying?'play':'pause'}
                    onClick={video.isLastVideo?()=>{handleProcess('video-reset')}:!video.isPlaying?()=>{handleProcess('play')}:()=>{handleProcess('pause')}}/>
                </button>
            </div>
        </>

    )
}