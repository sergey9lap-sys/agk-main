"use client";
import {useEffect} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
export default function ClientEffects(){
 useEffect(()=>{
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  gsap.registerPlugin(ScrollTrigger);
  const ctx=gsap.context(()=>{
   gsap.from('.hero-copy,.hero-visual',{y:18,opacity:0,duration:.65,stagger:.08,ease:'power3.out'});
   gsap.utils.toArray<HTMLElement>('[data-reveal],[data-dossier],[data-act]').forEach(el=>{
    gsap.from(el,{y:16,opacity:0,duration:.55,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 94%',once:true}});
   });
   gsap.utils.toArray<HTMLElement>('[data-transformation-card]').forEach(card=>{
    gsap.timeline({scrollTrigger:{trigger:card,start:'top 88%',once:true}})
     .from(card.querySelector('.is-before'),{opacity:0,y:14,duration:.45,ease:'power3.out'})
     .from(card.querySelector('.change-arrow'),{opacity:0,scale:.85,duration:.2})
     .from(card.querySelector('.is-after'),{opacity:0,y:14,duration:.5,ease:'power3.out'});
   });
  });
  return()=>ctx.revert();
 },[]);
 return null;
}
