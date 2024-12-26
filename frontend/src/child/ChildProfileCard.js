
export default function ChildProfileCard({ child }) {
    
    console.log("ChildProfileCard : ", child);
    return (
        <div className='flex w-full'>
            {/* <ChildProfileCard /> */}
            <div className='w-1/2 h-[180px] m-2 bg-red-50'>
                생일 : {child.childName}, 이름 : {child.birth}
            </div>
            <div className='w-1/2 h-[180px] m-2 bg-red-50'>
                접종체크리스트
                <div>
                    필수접종 : {child.mandatory }/32
                </div>
                <div>
                    선택접종 : {child.optional }/11
                </div>
            </div>
        </div>
    )
}
