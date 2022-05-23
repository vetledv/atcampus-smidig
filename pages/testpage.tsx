import TwoOptionsButtons from 'components/findgroups/TwoOptionsButtons'
import DropDown from 'components/general/DropDown'
import GroupMain from 'components/groups/GroupMain'
import AddTag from 'components/groups/groupSettings/AddTag'
import EditTagCard from 'components/groups/groupSettings/EditGroupCard'
import GroupMembers from 'components/groups/groupSettings/GroupMembers'
import GroupNav from 'components/groups/groupSettings/GroupNav'
import GroupSettingsNav from 'components/groups/groupSettings/GroupSettingsNav'

import NavBarTut from 'components/navigation/NavBarTutorial'
import NavBarTut2 from 'components/navigation/NavBarTutorial2'
import React from 'react'
import { useState } from 'react'

const TestPage = () => {
    return (
        <div className='h-screen w-screen'>
            <div className='py-2'>
                <NavBarTut2 />
            </div>
            <div className='bg-red-800'>
                <div className='py-2'>
                    <AddTag />
                </div>
                <EditTagCard />
                <div className='p-4'>
                    <TwoOptionsButtons />
                </div>
                <div className='py-2'>
                    <GroupMembers />
                </div>
                <GroupNav />
                <div className='py-2'>
                    <GroupSettingsNav />
                </div>
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
