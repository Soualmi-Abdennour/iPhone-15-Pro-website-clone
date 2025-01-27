import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef, useState } from "react"
import { yellowImg } from "../utils"
import * as THREE from 'three'
import ModelView from "./ModelView"
import { Canvas } from "@react-three/fiber"
import { View } from "@react-three/drei"
import { models } from "../constants"
import { sizes } from "../constants"


export default function Model(){
    useGSAP(()=>{
        gsap.to("#heading",{y:0,opacity:1})
    },[])
    const [size,setSize]=useState('small')
    const [model,setModel]=useState({
        title:'iPhone 15 Pro in Natural Titanium',
        color:['#8f8a81','#ffe7b9','#6f6c64'],
        img:yellowImg
    })
    const cameraControlSmall=useRef();
    const cameraControlLarge=useRef();

    const small=useRef(new THREE.Group());
    const large=useRef(new THREE.Group());

    const [smallRotation,setSmallRotation]=useState(0)
    const [largeRotation,setLargeRotation]=useState(0)
    
    return (
        <section className="common-padding">
            <div className="screen-max-width">
                <h1 id="heading" className="section-heading">Take a closer look</h1>
            </div>
            <div className="flex flex-col items-center mt-5">
                <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
                    <ModelView
                        index={1}
                        groupRef={small}
                        gsapType="view1"
                        controlRef={cameraControlSmall}
                        setRotationState={setSmallRotation}
                        item={model}
                        size={size}
                    ></ModelView>
                    <ModelView
                        index={2}
                        groupRef={large}
                        gsapType="view1"
                        controlRef={cameraControlLarge}
                        setRotationState={setLargeRotation}
                        item={model}
                        size={size}
                    ></ModelView>
                    <Canvas className="w-full h-full"
                        style={{
                            position:'fixed',
                            top:0,
                            bottom:0,
                            left:0,
                            right:0,
                            overflow:'hidden'
                        }}  
                        eventSource={document.getElementById('root')}
                    >
                        <View.Port></View.Port>
                    </Canvas>
                </div>
                <div className="mx-auto w-full">
                    <p className="text-sm font-light text-center mb-5">{model.title}</p>
                    <div className="flex-center">
                        <ul className="color-container">
                            {models.map((item,index)=>(
                                <li key={index} className="w-6 h-6 rounded-full mx-2 cursor-pointer" style={{backgroundColor:item.color[0]}}
                                    onClick={()=>setModel(item)}>
                                </li>
                            ))}
                        </ul>
                        <button className="size-btn-container">{sizes.map(({label,value})=>(
                            <span key={label} className="size-btn" 
                                style={{
                                    backgroundColor:size === value?'white':'transparent',
                                    color:size===value?'black':'white'}}
                                onClick={()=>{setSize(value)}}>
                                {label}
                            </span>
                        ))}</button>
                    </div>
                </div>
            </div>
        </section>
    )
}