import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { useCallback } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { PaginatedGroups } from 'types/groups'

const PaginationNav = ({
    isPreviousData,
    hasNextPage,
    data,
    page,
    setPage,
    limit,
}: {
    isPreviousData: boolean
    hasNextPage: boolean
    data: PaginatedGroups
    page: number
    setPage: Dispatch<SetStateAction<number>>
    limit: number
}) => {
    const pageButtonsArray = useCallback(() => {
        const pages = []
        for (let i = 1; i <= data.totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={
                        ' h-fit px-4 py-2 border border-purple-4' +
                        (i === page
                            ? ' bg-purple-1 text-white '
                            : 'bg-white hover:bg-dark-6')
                    }
                    onClick={() => setPage(i)}>
                    {i}
                </button>
            )
        }
        return pages as JSX.Element[]
    }, [data.totalPages, page, setPage])

    return (
        <div className='flex bg-white border border-purple-4 rounded-lg py-3 px-6 mb-12 justify-between shadow-sm shadow-purple-5 items-center'>
            <div className='flex gap-1 justify-end text-sm h-fit'>
                Viser {(page - 1) * limit + 1} til{' '}
                {data.groups.length + (page - 1) * limit} av {data.totalGroups}{' '}
                grupper
            </div>
            <div className='flex'>
                <button
                    className={
                        ' px-2 rounded-tl-lg rounded-bl-lg border-l border-t border-b  ' +
                        (page !== 1 ? 'hover:bg-dark-6' : '')
                    }
                    onClick={() => setPage((old) => Math.max(old - 1, 0))}
                    disabled={page === 1}>
                    <ChevronLeftIcon className='w-5 h-5 text-dark-3' />
                </button>
                {pageButtonsArray()}
                <button
                    className={
                        ' px-2 rounded-tr-lg rounded-br-lg border-r border-t border-b ' +
                        (hasNextPage ? 'hover:bg-dark-6' : '')
                    }
                    onClick={() => {
                        if (!isPreviousData && hasNextPage) {
                            setPage((old) => old + 1)
                        }
                    }}
                    disabled={isPreviousData || !hasNextPage}>
                    <ChevronRightIcon className='w-5 h-5 text-dark-3' />
                </button>
            </div>
        </div>
    )
}
export default PaginationNav
