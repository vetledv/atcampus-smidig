import FullCalendar, { EventInput, EventContentArg } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const data: EventInput[] = [
    {
        title: 'Test1',
        start: '2022-05-02',
        sted: 'Klasserom 1',
    },
    {
        title: 'Test 2',
        start: '2022-05-06',
        sted: 'Klasserom 2',
    },
    {
        title: 'Test3',
        start: '2022-05-22',
        sted: 'Klasserom 3',
    },
]

const GroupCalendar = () => {
    const renderEvent = (e: EventContentArg) => {
        return (
            <>
                <span>{e.event.title}</span>&nbsp;
                <span>| {e.event.extendedProps.sted}</span>
            </>
        )
    }
    return (
        //<div className='bg-purple-4 p-4 rounded-standard'>
        <FullCalendar
            eventContent={renderEvent}
            events={data}
            plugins={[dayGridPlugin]}
            eventBackgroundColor='#7C7FCA'
            eventColor='#7C7FCA'
            eventTextColor='#FFFFFF'
            eventBorderColor='#7C7FCA'
            height={'auto'}
        />
        //</div>
    )
}

export default GroupCalendar
