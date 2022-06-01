import { useLayoutEffect, useMemo, useRef } from 'react'

const useRetainScrollPos = (deps: any = []) => {
    const contRef = useRef<any>(null)
    const previousScrollPos = useRef(0)

    useMemo(() => {
        if (contRef.current) {
            const cont = contRef.current
            previousScrollPos.current = cont.scrollHeight - cont.scrollTop
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps])

    useLayoutEffect(() => {
        if (contRef?.current) {
            const cont = contRef.current
            cont.scrollTop = cont.scrollHeight - previousScrollPos.current
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps])
    return { contRef } as const
}

export default useRetainScrollPos
