import "./FilterSummary.scss";
import { useState, useEffect } from "react";

export default function FilterSummary({ filtersApplied, membersSelected }) {
    const [filters, setFilters] = useState([]);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        setFilters(filtersApplied);
    }, [filtersApplied]);

    useEffect(() => {
        setMembers(membersSelected);
    }, [membersSelected]);

    return (
        <section className="filter-summary">
            <div className="filter-summary__members">
                {members.length} Members
                <p className="filter-summary__members--p"></p>
            </div>

            <ul className="filters-list">
                {filters.map((filter) => (
                    <li className="filters-list__item" key={filter.index}>
                        <p className="item__text">{filter}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
