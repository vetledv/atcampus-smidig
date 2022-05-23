import { useQuery } from 'react-query'
import { Group } from 'types/groups'

export const fetchReactQuery = (query?: string) => {
    return async () => {
        const res = await fetch(`/api/${query}`)
        const data = await res.json()
        return data
    }
}

export const postJSON = async (url: RequestInfo, object: any) => {
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(object),
    })
    if (!res.ok) {
        throw new Error(`Failed to post ${res.status}: ${res.statusText}`)
    }
}

export const postReactQuery = async (url: RequestInfo, object: any) => {
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(object),
    })
        .then((res) => res.json())
        .catch((err) => {
            console.error(err)
        })
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
