"use client";

import { trackEvent } from "@/lib/umami";
import { useEffect } from "react";

const HomePageAnalytics = () => {
    useEffect(() => {
        trackEvent("HomePageView", { page: "Home" });
    }, []);
    return null;
}
const TagsPageAnalytics = () => {
    useEffect(() => {
        trackEvent("TagsPageView", { page: "Tags" });
    }, []);
    return null;
}
const BlogPageAnalytics = () => {
    useEffect(() => {
        trackEvent("BlogPageView", { page: "Blog" });
    }, []);
    return null;
}

const AboutPageAnalytics = () => {
    useEffect(() => {
        trackEvent("AboutPageView", { page: "About" });
    }, []);
    return null;
}

export { HomePageAnalytics, TagsPageAnalytics, BlogPageAnalytics, AboutPageAnalytics };