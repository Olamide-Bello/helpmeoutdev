import React from 'react'

type Props = {}

const Transcript = ({ data }: { data: any }) => {
    return (
        <div className='mt-10 mb-20'>
            <h3 className='font-Work-Sans text-[20px] font-[500] '>Transcript</h3>
            <div className='my-4'>
                <select className='py-2 px-5 pr-10 border-[1px] font-Work-Sans text-gray-400 rounded-lg border-gray-200 min-w-[140px] bg-right-10' defaultValue="English" name="languages" id="languages">
                    <option value="english">English</option>
                    <option value="french">French</option>
                    <option value="spanish">Spanish</option>
                    <option value="italian">Italian</option>
                    <option value="chinese">Chinese</option>
                </select>
            </div>
            {data?.map((el: any, i: number) => {
                const lastItem = data.length - 1;
                return (
                    <div key={el.id} className="flex justify-start items-start gap-10">
                        <p className="text-black font-semibold">{el.time}</p>
                        <div>
                            <p
                                className={`text-gray-900 text-sm font-normal ${i === lastItem ? "opacity-25" : "opacity-100"
                                    }`}
                            >
                                {el.msg}
                            </p>
                        </div>
                    </div>
                );
            })}

        </div>
    )
}

export default Transcript