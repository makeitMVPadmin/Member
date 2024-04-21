import './FilterSummary.scss'
import { useState, useEffect } from 'react'

export default function FilterSummary({filtersApplied, membersSelected}){
    const [filters, setFilters] = useState([])
    const [members, setMembers] = useState([])

    useEffect(()=>{
        setFilters(filtersApplied)
    }, [filtersApplied])

    useEffect(()=>{
        setMembers(membersSelected)
    }, [membersSelected])


    return(
        <section className="filter-summary">
            Hello from filter summary!
            <div className="filter-summary__members">
                <p className="filter-summary__members--p">{members.length} Members</p>
            </div>
            
                <ul className="filters-list">
                    {filters.map((filter)=>(
                        <li className="filter-list__item" key={filter.index}>{filter}</li>
                    ))}
                </ul>
            
            
            
            
        </section>
    )
}

