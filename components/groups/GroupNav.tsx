import { Dispatch, SetStateAction, useCallback } from 'react'

const GroupNav = ({
    activeTab,
    setActiveTab,
    tabs,
}: {
    activeTab: number
    setActiveTab: Dispatch<SetStateAction<number>>
    tabs?: string[]
}) => {
    //put const [activeTab, setActiveTab] = useState(0) in parent component

    const renderTabs = useCallback(() => {
        if (!tabs) return null
        return (
            <ul className='flex flex-row justify-start px-6 space-x-12 items-end font-medium text-dark-3 border-b-2 w-full '>
                {tabs.map((tab, index) => (
                    <div
                        className='h-full'
                        key={tab}
                        onClick={() => setActiveTab(index)}>
                        <button
                            className={
                                'h-full ' +
                                (activeTab === index
                                    ? 'text-dark-1 border-b-4  border-purple-1'
                                    : ' ' +
                                      ' text-dark-3 border-b-4 border-white ')
                            }>
                            {tab}
                        </button>
                    </div>
                ))}
            </ul>
        )
    }, [activeTab, setActiveTab, tabs])

    return (
        <div className={'h-12 min-w-96 bg-white '}>
            <div className='flex justify-between h-full'>{renderTabs()}</div>
        </div>
    )
}

export default GroupNav
