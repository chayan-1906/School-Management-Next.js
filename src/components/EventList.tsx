import prisma from "@/lib/prisma";

async function EventList({dateParam}: { dateParam?: string | undefined; }) {
    const date = dateParam ? new Date(dateParam) : new Date();
    const events = await prisma.event.findMany({
        where: {
            startTime: {
                gte: new Date(date.setHours(0, 0, 0, 0)),
                lte: new Date(date.setHours(23, 59, 59, 999)),
            },
        },
    });

    return (
        <div>
            {events.map(({id, title, description, startTime}) => (
                <div key={id} className={'p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple'}>
                    <div className={'flex items-center justify-between'}>
                        <h1 className={'font-semibold text-gray-600'}>{title}</h1>
                        <span className={'text-gray-300 text-xs'}>{startTime.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})}</span>
                    </div>
                    <p className={'mt-2 text-gray-400 text-sm'}>{description}</p>
                </div>
            ))}
        </div>
    );
}

export default EventList;
