import { useQuery } from 'react-query'
import { Group } from 'types/groups'

export const fetchReactQuery = (query?: string) => {
    return async () => {
        const res = await fetch(`/api/${query}`)
        const data = await res.json()
        return data
    }
}

export const useGroups = () => {
    return useQuery<Group[], Error>('groups', fetchReactQuery('groups'))
}

export const useGroup = (groupName: string) => {
    return useQuery<Group, Error>(
        ['group', groupName],
        fetchReactQuery(`groups/${groupName}`)
    )
}
