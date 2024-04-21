import './FilterSummary.scss'
import { useState, useEffect } from 'react'
import Icons from '../../functions/icons_holder'

export default function FilterSummary({filtersApplied, membersSelected, removeFilterFunction}){
    const [filters, setFilters] = useState([])
    const [members, setMembers] = useState([])

    useEffect(()=>{
        setFilters(filtersApplied)
    }, [filtersApplied])

    useEffect(()=>{
        setMembers(membersSelected)
    }, [membersSelected])


    const handleCloseClick = ((target)=>{
        // removeFilterFunction()
        console.log("remove filter func")
    })


    return(
        <section className="filter-summary">
            <div className="filter-summary__members">
            {members.length} Members
                <p className="filter-summary__members--p"></p>
            </div>
            
                <ul className="filters-list">
                    {filters.map((filter)=>(
                        <li className="filters-list__item" key={filter.index}>
                            <p className="item__text">{filter}</p>
                            <img src={Icons().IconClose} alt="close" className="item__image" onClick={handleCloseClick}/>
                        </li>
                        
                    ))}
                </ul>
            
            
            
            
        </section>
    )
}

