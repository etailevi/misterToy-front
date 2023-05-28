import { useEffect, useState } from 'react'
import { toyService } from '../services/toy.service'
import LabelSelect from './label-select'
import { setFilter } from '../store/toy.action'

export default function ToyFilter({ onSetFilter, filterBy }) {
    filterBy = filterBy ? filterBy : toyService.getDefaultFilter()
    const [name, setName] = useState(filterBy.name)
    const [inStock, setInStock] = useState(filterBy.inStock)
    const [labels, setLabels] = useState(filterBy.labels)
    const [isWriting, setIsWriting] = useState(false)

    useEffect(() => {
        setName(filterBy.name)
        setInStock(filterBy.inStock)
        setLabels(filterBy.labels)
    }, [filterBy])

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (isWriting) {
                setIsWriting(false)
                onSetFilter({ name })
            }
        }, 400)
        return () => {
            clearTimeout(debounce)
        }
    }, [isWriting])

    function onNameChange({ target }) {
        setIsWriting(true)
        setName(target.value)
    }

    function onStockChange({ target }) {
        setInStock(target.value)
        onSetFilter({ inStock: target.value })
    }

    function onSelectChange({ target }) {
        const val = target.value
        onSetFilter({ labels: val })

    }

    function onRemoveLabel(e, val) {
        e.preventDefault()
        const newLabels = [...labels]
        const removeLabelIdx = newLabels.indexOf(val)
        newLabels.splice(removeLabelIdx, 1)
        setLabels(newLabels)
        onSetFilter({ labels: newLabels })
    }

    return (
        <form>
            <div className="filter-container">

            <div className='search-bar'>
                <input value={name} onChange={onNameChange} type="text" name="name" placeholder="Search..."></input>
            </div>
            <div>
                <LabelSelect labels={filterBy.labels} onSelectChange={onSelectChange} />
            </div>
            </div>
            <div className='in-stock-filter'>
                <input onChange={onStockChange} id="in-stock-all" type="radio" name="in-stock" value="all" checked={inStock === 'all'}></input>
                <label htmlFor="in-stock-all">All</label> |
                <input onChange={onStockChange} id="in-stock-stock" type="radio" name="in-stock" value="true" checked={inStock === 'true'}></input>
                <label htmlFor="in-stock-stock">In stock</label> |
                <input onChange={onStockChange} id="in-stock-out" type="radio" name="in-stock" value="false" checked={inStock === 'false'}></input>
                <label htmlFor="in-stock-out">Out of stock</label>
            </div>
        </form>
    )
}