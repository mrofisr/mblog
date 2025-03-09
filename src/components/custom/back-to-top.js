import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const threshold = 100; // Show button after scrolling 100px

    // Memoized scroll handler using useCallback
    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        setIsVisible(currentScrollY > threshold);
    }, []);

    // Memoized scroll to top function
    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    if (!isVisible) return null;

    return (
        <Button
            onClick={scrollToTop}
            className={`
                fixed bottom-4 right-4 z-50 
                rounded-full p-3 shadow-lg 
                bg-white dark:bg-gray-800 
                text-black dark:text-white 
                hover:bg-white hover:scale-110 
                border border-gray-300 dark:border-gray-700 
                transition-all duration-300
            `}
            size="icon"
            aria-label="Scroll to top"
        >
            <ArrowUp className="h-4 w-4" />
        </Button>
    );
};

export default BackToTop;
