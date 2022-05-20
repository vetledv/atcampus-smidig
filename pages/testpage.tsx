import TwoOptionsButtons from 'components/findgroups/TwoOptionsButtons'
import GroupHeader from 'components/groups/GroupHeaderMobile'
import AddTag from 'components/groups/GroupSettings/AddTag'
import EditTagCard from 'components/groups/GroupSettings/EditGroupCard'
import GroupMembers from 'components/groups/GroupSettings/GroupMembers'
import GroupNav from 'components/groups/GroupSettings/GroupNav'
import NavBarTut from 'components/navigation/NavBarTutorial'
import NavBarTut2 from 'components/navigation/NavBarTutorial2'
import React from 'react'
import { useState } from 'react'

const TestPage = () => {
    return (
        <div className='h-screen w-screen'>
            <NavBarTut2 />
            <div className='bg-red-800'>
                <AddTag />
                <EditTagCard />
                <div className='p-4'>
                    <TwoOptionsButtons />
                </div>
                <GroupMembers />
                <GroupNav />
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
