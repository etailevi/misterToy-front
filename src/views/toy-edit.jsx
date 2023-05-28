import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { useForm } from "../customHooks/useForm.js"
import LabelSelect from "../cmps/label-select.jsx"

export default function ToyEdit() {
    // const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const [toyToEdit, setToyToEdit, handleChange] = useForm(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (!toyId) return
        loadToy()
        // eslint-disable-next-line
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }


    function onSaveToy(ev) {
        ev.preventDefault()
        toyService.save(toyToEdit)
            .then((toy) => {
                console.log('toy saved', toy);
                showSuccessMsg('Toy saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot save toy')
            })
    }

    function onLabelSelect({ target }) {
        const val = target.value
        setToyToEdit(prev => ({ ...prev, labels: val }))
    }

    return (
        <section className="toy-edit-container">
            <h2>{toyToEdit._id ? 'Edit this toy' : 'Add a new toy'}</h2>

            <form onSubmit={onSaveToy} className="toy-edit" >
                <div className="name-price-input">
                    <label htmlFor="name"> </label>
                    <input type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Name..."
                        value={toyToEdit.name}
                        onChange={handleChange}
                    /></div>
                <div className="name-price-input">
                    <label htmlFor="price"></label>
                    <input type="number"
                        name="price"
                        id="price"
                        placeholder="Enter price"
                        value={toyToEdit.price}
                        onChange={handleChange}
                    /></div>
                <LabelSelect labels={toyToEdit.labels} onSelectChange={onLabelSelect} />
                <div>
                    <Link to="/toy" className="form-btn add-save">{toyToEdit._id ? 'Save' : 'Add'}</Link>
                    <Link to="/toy" className="form-btn close">Cancel</Link>
                </div>
            </form>
        </section>
    )
}