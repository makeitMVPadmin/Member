import './MembersView.scss'
import FilterSummary from '../FilterSummary/FilterSummary'

export default function MembersView(){
    const dummyFilters = ["filterOne", "filterTwo", "filterThree"];
    const dummyMembers = ["memOne", "memTwo", "memThree", "memFour", "memFive", "memSix", "memSeven"];
    return(
        <>
            Hello from MembersView!
            Put components here
            <FilterSummary filtersApplied={dummyFilters} membersSelected={dummyMembers}/>
        </>
    )
}