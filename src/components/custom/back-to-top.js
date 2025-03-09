import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const BackToTop = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    // Update scroll progress
    const updateScrollProgress = () => {
        const scrollPx = document.documentElement.scrollTop;
        const winHeightPx =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        const scrolled = (scrollPx / winHeightPx) * 100;
        
        setScrollProgress(scrolled);
    };

    // Smooth scroll to top without blocking state
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", updateScrollProgress);
        return () => {
            window.removeEventListener("scroll", updateScrollProgress);
        };
    }, []);

    return (
        <Button
            onClick={scrollToTop}
            className={`fixed bottom-4 right-4 z-50 rounded-full p-3 shadow-lg bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-white hover:scale-110 border border-gray-300 dark:border-gray-700 transition-opacity duration-300 ${scrollProgress === 0 ? 'opacity-0' : 'opacity-100'}`}
            size="icon"
        >
            <ArrowUp className="h-4 w-4" />
        </Button>
    );
};

export default BackToTop;
