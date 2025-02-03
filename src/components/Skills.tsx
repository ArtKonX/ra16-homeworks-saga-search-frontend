import { useSelector, useDispatch } from "react-redux";
import { changeSearchField } from "../redux/slices/searchSlice";
import { ChangeEvent } from "react";

export default function Skills() {
    const { items, loading, error, search } = useSelector(
        (state: SkillsSelector) => state.searches
    );
    const dispatch = useDispatch()

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        dispatch(changeSearchField({ search: value }));
    }

    const hasQuery = search.trim() !== "";

    return (
        <main className="main">
            <div className="search-input-container">
                <input className='search-input' type="text" value={search} onChange={handleSearch} />
            </div>
            {!hasQuery && <div className="not-values-search">Type something to search</div>}
            {hasQuery && loading && <div className="loading">searching...</div>}
            {error ? (
                <div className="error">Error occured</div>
            ) : (
                <ul className="items">
                    {items.map((o) => (
                        <li className='item' key={o.id}>{o.name}</li>
                    ))}
                </ul>
            )}
        </main>
    );
}