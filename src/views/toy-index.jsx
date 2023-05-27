import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { toyService } from '../services/toy.service.js'

import ToyList from '../cmps/toy-list.jsx'
import ToyFilter from '../cmps/toy-filter.jsx'
import { ADD_TOY_TO_CART } from '../store/toy.reducer.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, setFilter } from '../store/toy.action.js'
import { ToySort } from '../cmps/toy-sort.jsx'

export default function ToyIndex() {

    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
    const pageCount = useSelector(storeState => storeState.toyModule.pages)
    const [sortBy, setSortBy] = useState({ type: '', desc: 1 })
    const [prevButton, setPrevButton] = useState(true)
    const [nextButton, setNextButton] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        loadToys(filterBy, sortBy)
    }, [filterBy, sortBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    // function addToCart(toy) {
    //     console.log(`Adding ${toy.vendor} to Cart`)
    //     showSuccessMsg('Added to Cart')
    //     dispatch({ type: ADD_TOY_TO_CART, toy })
    // }
    function onSetFilter(filter) {
        setFilter({ ...filterBy, ...filter })
    }

    function onChangePageIdx(diff) {
        // const pageCount = toyService.getPages()
        console.log('page count', pageCount)
        console.log('filterBy.pageIdx', filterBy.pageIdx);
        setNextButton(false)
        setPrevButton(false)

        if (pageCount <= filterBy.pageIdx + diff) {
            setNextButton(true)
            return
        } if (0 > filterBy.pageIdx + diff) {
            setPrevButton(true)
            return
        }

        const nextPageIdx = filterBy.pageIdx + diff
        onSetFilter({ ...filterBy, pageIdx: nextPageIdx })
    }

    return (
        <section className='toy-index view'>
            <button><Link to={`/toy/edit`}>Add Toy</Link></button>
            {isLoading && <div>Loading...</div>}
            <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <ToySort sortBy={sortBy} setSortBy={setSortBy} />
            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
                onEditToy={(toy) => navigate(`/toy/:${toy._id}`)}
            // addToCart={addToCart}
            />
            <section className='paging-container'>
                <button disabled={prevButton} onClick={() => onChangePageIdx(-1)}>-</button>
                <span>{filterBy.pageIdx + 1}</span>
                <button disabled={nextButton} onClick={() => onChangePageIdx(1)}>+</button>
            </section>
        </section>
    )
}