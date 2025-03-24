import {GrAnnounce} from "react-icons/gr";

function Announcements() {
    return (
        <div className={'bg-white p-4 rounded-md shadow-2xl shadow-gray-300'}>
            <div className={'flex items-center justify-between'}>
                <div className={'flex gap-2 items-center'}>
                    <h1 className={'text-lg font-semibold'}>Announcements</h1>
                    <GrAnnounce size={20}/>
                </div>
                <span className={'text-xs text-gray-400'}>View All</span>
            </div>
            <div className={'flex flex-col gap-4 mt-4'}>
                {/** announcement #1 */}
                <div className={'bg-lamaSkyLight rounded-md p-4'}>
                    <div className={'flex items-center justify-between'}>
                        <h2 className={'font-medium'}>Lorem ipsum dolor sit</h2>
                        <span className={'text-xs text-gray-400 bg-white rounded-md p-1'}>2025-04-01</span>
                    </div>
                    <p className={'text-sm text-gray-400 mt-1'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                </div>

                {/** announcement #2 */}
                <div className={'bg-lamaPurpleLight rounded-md p-4'}>
                    <div className={'flex items-center justify-between'}>
                        <h2 className={'font-medium'}>Lorem ipsum dolor sit</h2>
                        <span className={'text-xs text-gray-400 bg-white rounded-md p-1'}>2025-04-01</span>
                    </div>
                    <p className={'text-sm text-gray-400 mt-1'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                </div>

                {/** announcement #3 */}
                <div className={'bg-lamaYellowLight rounded-md p-4'}>
                    <div className={'flex items-center justify-between'}>
                        <h2 className={'font-medium'}>Lorem ipsum dolor sit</h2>
                        <span className={'text-xs text-gray-400 bg-white rounded-md p-1'}>2025-04-01</span>
                    </div>
                    <p className={'text-sm text-gray-400 mt-1'}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                </div>
            </div>
        </div>
    );
}

export default Announcements;
