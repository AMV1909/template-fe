import { useState, useEffect } from "react";
import { mobileBreakpoint } from "@/shared/constants";

export function useWindowSize() {
    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);

    const isMobile = width && width < mobileBreakpoint;

    useEffect(() => {
        if (typeof window === "undefined") return;

        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return { width, height, isMobile };
}
