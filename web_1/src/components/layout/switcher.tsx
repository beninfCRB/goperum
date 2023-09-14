"use client"

import React, { useState, useEffect } from 'react'
import { Routes, useLocation } from 'react-router-dom'
import TopBarProgress from 'react-topbar-progress-indicator'

const Switcher = ({ children }: { children: React.ReactNode }) => {
    const [progress, setProgress] = useState(false)
    const [prevLoc, setPrevLoc] = useState("")
    const location = useLocation()

    useEffect(() => {
        setPrevLoc(location.pathname)
        setProgress(true)
        if (location.pathname === prevLoc) {
            setPrevLoc('')
        }
    }, [location])

    useEffect(() => {
        setProgress(false)
    }, [prevLoc])

    return (
        <>
            {progress && <TopBarProgress />}
            <Routes>{children}</Routes>
        </>
    )
}

export default Switcher