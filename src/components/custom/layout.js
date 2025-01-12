'use client'
import { NextSeo } from "next-seo"
import Navbar from "@/components/custom/navbar"

export default function Layout({ children, title, description }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <NextSeo
        title={title}
        description={description}
        openGraph={{ title, description }}
      />
      <Navbar />
      <main
        className="flex flex-col w-full px-8 sm:px-16 md:px-36 lg:px-52 xl:px-80 2xl:px-96 pt-24 text-gray-900 dark:text-gray-100"
      >
        {children}
      </main>
    </div>
  )
}