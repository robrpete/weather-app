const SearchResult = ({City, State, onClick}) => {
    return (
        <div className="bg-blue-400 px-2 py-1 rounded-md text-slate-800 m-1">
            <button onClick={onClick} className="w-fit">{City}, {State}</button>
        </div>
    )
  }

export default SearchResult;