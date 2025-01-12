'use client'
import { NextSeo } from "next-seo"
import Navbar from "@/components/custom/navbar"
import { motion } from "framer-motion"

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
}

export default function Layout({ children, title, description }) {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{ title, description }}
      />
      <Navbar />
      <motion.main
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ type: "linear" }}
        className="flex flex-col w-full px-8 sm:px-16 md:px-36 lg:px-52 xl:px-80 2xl:px-96 pt-24"
      >
        {children}
      </motion.main>
    </>
  )
}