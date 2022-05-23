import { useState } from 'react'

interface Tabs {
    tabTextOne: string
    tabTextTwo: string
    tabTextThree: string
    underline: boolean
}

const Tabs = (props: Tabs) => {
    const [color, setColor] = useState(0)

    const selectedTab = 'bg-purple-1 text-white rounded'
    const selectedTabUnderline = 'border-b-4 border-purple-1 text-dark-1'

    const switchColor = (idx: number) => {
        setColor(idx)
    }

    const tab = (i: number, text: string) => {
        const tabStyle = props.underline ? selectedTabUnderline : selectedTab
        return (
            <div
                onClick={() => switchColor(i)}
                className={`${
                    color === i ? tabStyle : 'bg-gray-200 text-dark-3'
                } py-2 px-6 font-semibold text-center w-full cursor-pointer`}>
                {text}
            </div>
        )
    }

    return (
        <div className='flex bg-gray-200 my-3 justify-between text-md'>
            {tab(0, props.tabTextOne)}
            {tab(1, props.tabTextTwo)}
            {tab(2, props.tabTextThree)}
        </div>
    )
}
export default Tabs
