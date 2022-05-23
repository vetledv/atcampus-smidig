const GroupTags = ({ tags }) => {
    return (
        <div className='text-dark-4 flex flex-wrap max-w-xs min-w-min'>
            {/*tag*/}
            {tags.map((tag) => (
                <div
                    key={tags.indexOf(tag)}
                    className='flex w-fit px-2 border-2 border-dark-5 rounded-standard mr-1 my-2 '>
                    <h1 className='text-sm  font-semibold px-1 '>{tag}</h1>
                </div>
            ))}
        </div>
    )
}

export default GroupTags
