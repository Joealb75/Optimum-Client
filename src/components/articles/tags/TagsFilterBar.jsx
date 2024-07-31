export const TagsFilterBar = ({ tags, selectedTag, onTagClick }) => {
    return (
        <div className="mb-4 flex flex-wrap gap-2">
            <button
                onClick={() => onTagClick(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${selectedTag === null ? 'bg-[#B87333] text-white' : 'bg-gray-200 text-gray-700 hover:bg-[#B87333] hover:text-white'}`}
            >
                All
            </button>
            {tags.map((tag) => (
                <button
                    key={tag.id}
                    onClick={() => onTagClick(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${selectedTag === tag ? 'bg-[#B87333] text-white' : 'bg-gray-200 text-gray-700 hover:bg-[#B87333] hover:text-white'}`}
                >
                    {tag.tag}
                </button>
            ))}
        </div>
    );
};
