import { useState, useEffect } from 'react'

const useScrollPosition = () => {
    const [scrollPos, setScrollPos] = useState(false)
    const handleScroll = () => {
        setScrollPos(window.scrollY > 200)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return scrollPos
}

export default useScrollPosition
