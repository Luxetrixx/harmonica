/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Scar56 (https://sketchfab.com/Scar56)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/harmonica-blues-harp-af5ac47932f34104a6779e77517c0573
title: Harmonica Blues Harp
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import {useSound} from 'use-sound'
import { createFFmpeg, FFmpeg } from '@ffmpeg/ffmpeg'
export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/harmonica/harmonica.gltf')
  const array = new FileConstructor();

  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[0, 2, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh geometry={nodes.defaultMaterial.geometry} material={materials.M_Metal_1} />
            <mesh geometry={nodes.defaultMaterial_1.geometry} material={materials.M_Metal_2} />
            <mesh geometry={nodes.defaultMaterial_2.geometry} material={materials.M_Wood_1} />




            <HoverZone position={[0.012,0.0321,0.01]} note="1" FileConstructor={array}/>
            <HoverZone position={[0.012,0.025,0.01]} note="2" FileConstructor={array}/>
            <HoverZone position={[0.012,0.0179,0.01]} note="3" FileConstructor={array}/>
            <HoverZone position={[0.012,0.0108,0.01]} note="4" FileConstructor={array}/>
            <HoverZone position={[0.012,0.0037,0.01]} note="5" FileConstructor={array}/>
            <HoverZone position={[0.012,-0.0037,0.01]} note="6" FileConstructor={array}/>
            <HoverZone position={[0.012,-0.0108,0.01]} note="7" FileConstructor={array}/>
            <HoverZone position={[0.012,-0.0179,0.01]} note="8" FileConstructor={array}/>
            <HoverZone position={[0.012,-0.025,0.01]} note="9" FileConstructor={array}/>
            <HoverZone position={[0.012,-0.0321,0.01]} note="10" FileConstructor={array}/>

          </group>
        </group>
      </group>
    </group>
  )
}



function HoverZone({...props}) {
  const mesh = useRef();
  const [colour,setColour] = React.useState("orange");
  const [enterTime, setEnterTime] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const [exitTime, setExitTime] = React.useState(0);
  const [attack] = useSound("/audio/" + props.note + "attack.mp3", {
    onend: () => { 
            console.log("attack ended");  
          }})
  const [sustain, { stop }] = useSound("/audio/" + props.note + "sustain.mp3", {
    loop:true, onend: () => {console.log("sustain note");}})
  const [decay] = useSound("/audio/" + props.note + "decay.mp3", {
    })
  const onHover = async () => {
    setColour("red");
    setEnterTime(Date.now());
    /*check length of array and if it isnt 0*/
    if (props.FileConstructor.getArray().length > 0) {
      const exitdiff = (Date.now() - exitTime)/1000;  
      console.log(Date.now(), exitTime, exitdiff);
      if(exitdiff < 100) {props.FileConstructor.setArray({note: 0,time: exitdiff});}

    }
    

    attack();
    setTimeout(() => {
      sustain();
    }, 889 );

  }
  const onHoverExit = () => {
    setColour("orange");
    props.FileConstructor.ConstructFile(props.FileConstructor.testArray());
    const timediff = (Date.now() - enterTime)/1000;
    console.log("Hovered on " + props.note + " for " + timediff + " seconds");
    props.FileConstructor.setArray({note: props.note,time: timediff});
    setExitTime(Date.now());
    setPlaying(false);
    stop();
    decay();
    setTimeout(() => {
      stop();
      setTimeout(() => {
        stop();
        setTimeout(() => {
          stop();
          setTimeout(() => {
            stop();
            setTimeout(() => {
              stop();
              setTimeout(() => {
                stop();
                setTimeout(() => {
                  stop();
                  setTimeout(() => {
                    stop();
                    setTimeout(() => {
                      stop();
                      setTimeout(() => {
                        stop();
                      }, 100);
                    }, 100);
                  }, 100);
                }, 100);
              }, 100);
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    }, 100);
    
  }

  return (
    <mesh {...props} ref={mesh} onPointerOver={() => onHover()} onPointerLeave={()=>{onHoverExit();stop();}} >
    <boxGeometry args={[.005,.005,.005]} />
    <meshStandardMaterial color={colour} opacity={0.1} transparent/>
    </mesh>
  )
}

class FileConstructor {
  constructor() {
    this.array = [];
    this.testarray = [{note: "1",time: 1},{note: 0,time:1},{note: "2",time: 1},{note:"3",time: 0.5}]
  }
  setArray(obj) {
    this.array.push(obj);
    console.log(this.array);
  }
  getArray() {
    return this.array;
  }
  testArray() {
    return this.testarray;
  }
  ConstructFile(array) {
    console.log(array);
    const ffmpeg = createFFmpeg();

    let totaltime = 0
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      if (element.note != 0){
      if (element["time"] > 0.889) {
        console.log("audio has a full attack");
        if (element["time"]-0.889 > 0 ) {
          console.log("audio has a full sustain");
          console.log("playing note " + element["note"] + " for " + element["time"] + " seconds with a sustain of " + (element["time"]-0.889) + " seconds");
        }
        else {
          console.log("no sustain, just playing decay")
          console.log("playing note " + element["note"] + " for " + element["time"] + " seconds with a decay");

        }
    }
    else {
      console.log("audio has cutoff attack");
      console.log("playing note " + element["note"] + " for " + element["time"] + " seconds with a cutoff attack");
    }
    totaltime += element["time"];}
    else {
      console.log("no note for " + element["time"] + " seconds");
      totaltime += element["time"];
    }
  }
  console.log("total time: " + totaltime);} 

    
}
useGLTF.preload('/harmonica/harmonica.gltf')
