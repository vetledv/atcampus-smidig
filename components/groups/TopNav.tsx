import { useRouter } from 'next/router'

const TopNav = ({
    groupId,
    groupName,
    settings,
}: {
    groupId: string
    groupName: string
    settings?: boolean
}) => {
    const router = useRouter()
    return (
        <div className='bg-white py-4 px-6 flex gap-2'>
            <div
                className='cursor-pointer hover:text-purple-500'
                onClick={() => router.push('/groups')}>
                Kollokviegrupper
            </div>
            {' / '}
            <div
                className='cursor-pointer hover:text-purple-500'
                onClick={() => router.push('/groups/' + groupId)}>
                {groupName}
            </div>
            {settings && (
                <>
                    {' / '}
                    <div
                        className='cursor-pointer hover:text-purple-500'
                        onClick={() =>
                            router.push('/groups/' + groupId + '/settings')
                        }>
                        Instillinger
                    </div>
                </>
            )}
        </div>
    )
}

export default TopNav
