'use client'
import React from 'react'
import PropTypes from 'prop-types'
import { NextSeo } from "next-seo"
import Navbar from "@/components/custom/navbar"
import Footer from '@/components/custom/footer'

function Layout({ children, title, description }) {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <NextSeo
        title={title}
        description={description}
        openGraph={{ title, description }}
      />
      <Navbar />
      <main className="flex-grow flex flex-col gap-8 w-full px-8 sm:px-16 md:px-36 lg:px-52 xl:px-80 2xl:px-96 pt-24 pb-24 text-gray-900 dark:text-gray-100">
        {children}
      </main>
      <Footer className="fixed bottom-0 left-0 w-full" />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
}

Layout.defaultProps = {
  title: 'Default Title',
  description: 'Default Description',
}

export default React.memo(Layout)
