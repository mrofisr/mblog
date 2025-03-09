import Link from "next/link";

/**
 * A pagination component that displays navigation buttons for multiple pages.
 * @component
 * @param {Object} props - Component props
 * @param {number|string} props.totalPages - Total number of pages
 * @param {number|string} props.currentPage - Current active page number
 * @returns {JSX.Element} A pagination component with Previous/Next buttons and current page indicator
 *
 * @example
 * <Pagination totalPages={5} currentPage={1} />
 */
export default function Pagination({ totalPages, currentPage }) {
    const currentPageNum = parseInt(currentPage);
    const totalPagesNum = parseInt(totalPages);
    
    const PaginationButton = ({ disabled, href, rel, children }) => {
        if (disabled) {
            return (
                <button 
                    rel={rel}
                    className="cursor-auto disabled:opacity-50" 
                    disabled
                >
                    {children}
                </button>
            );
        }
        
        return (
            <Link href={href}>
                <button rel={rel}>{children}</button>
            </Link>
        );
    };

    const getPageLink = (pageNum) => {
        return pageNum === 1 ? '/blog/' : `/blog/page/${pageNum}`;
    };

    return (
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
            <nav className="flex justify-between">
                <PaginationButton
                    disabled={currentPageNum <= 1}
                    href={getPageLink(currentPageNum - 1)}
                    rel="previous"
                >
                    Previous
                </PaginationButton>

                <span>
                    {currentPageNum} of {totalPagesNum}
                </span>

                <PaginationButton
                    disabled={currentPageNum >= totalPagesNum}
                    href={getPageLink(currentPageNum + 1)}
                    rel="next"
                >
                    Next
                </PaginationButton>
            </nav>
        </div>
    );
}