import { useState, useEffect } from 'react'

const useScrollPosition = () => {
    const [scrollPos, setScrollPos] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrollPos(window.scrollY > 200)
        }

        window.addEventListener('scroll', handleScroll)

        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return scrollPos
}

export default useScrollPosition
