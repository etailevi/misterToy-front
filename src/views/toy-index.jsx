import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { toyService } from '../services/toy.service.js'

import ToyList from '../cmps/toy-list.jsx'
import ToyFilter from '../cmps/toy-filter.jsx'
import { ADD_TOY_TO_CART } from '../store/toy.reducer.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy, setFilter } from '../store/toy.action.js'

export default function ToyIndex() {

    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

    const navigate = useNavigate()

    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getEmptyToy()

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?', toy.price)
        if (!price || price === toy.price) return

        const toyToSave = { ...toy, price }
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
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

    return (
        <section className='toy-index view'>
            <div>toy-index</div>
           <button><Link to={`/toy/edit`}>Add Toy</Link></button>
            {isLoading && <div>Loading...</div>}
            <ToyFilter onSetFilter={onSetFilter} filterBy={filterBy} />
            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
                onEditToy={(toy) => navigate(`/toy/:${toy._id}`)}
            // addToCart={addToCart}
            />
        </section>
    )
}