import TwoOptionsButtons from 'components/findgroups/TwoOptionsButtons'
import { GroupMembers } from 'components/general/Lib'
import GroupMain from 'components/groups/GroupMain'
import Tabs from 'components/groups/Tabs'
import { useState } from 'react'

const TestPage = () => {
    const [activeTab, setActiveTab] = useState(0)
    return (
        <div className='h-screen w-screen'>
            <div className='bg-red-800'>
                <div className='p-4'>
                    <TwoOptionsButtons />
                </div>
                <div className='py-2'>
                    <GroupMembers
                        members={undefined}
                        totalMembers={undefined}
                        color={undefined}
                    />
                </div>
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className='py-2'>
                    <GroupMain />
                </div>
                <div className='py-2'></div>

                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-3xl font-bold'>TestPage</h1>
                    <p className='text-xl my-36 space-y-36'>
                        This is a test page for the tutorial.
                    </p>

                    <h1 className='text-3xl font-bold'>TestPage</h1>
                    <p className='text-xl py-36 space-y-36'>
                        This is a test page for the tutorial.
                    </p>
                    <h1 className='text-3xl font-bold'>TestPage</h1>
                    <p className='text-xl py-36 space-y-36'>
                        This is a test page for the tutorial.
                    </p>
                    <h1 className='text-3xl font-bold'>TestPage</h1>
                    <p className='text-xl py-36 space-y-36'>
                        This is a test page for the tutorial.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TestPage
