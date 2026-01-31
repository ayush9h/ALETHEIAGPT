import { useEffect, useRef } from "react";

export function AutoScroll<T extends HTMLElement>(
    deps:[number]
){
    const containerRef= useRef<T | null>(null);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    },deps);

    return {containerRef, bottomRef};
}   