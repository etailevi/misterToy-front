import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export default function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>
    const robohashUrl = `https://robohash.org/${toy._id}?set=set2&size=200x200`
    
    return <section className="toy-details">
        <h1>Toy: {toy.name}</h1>
        <img src={robohashUrl}></img>
        <h5>Price: ${toy.price}</h5>
        <h5>{toy.labels}</h5>
        <div>{toy.inStock}</div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
        {/* <Link to={`/toy/edit/${toy._id}`}>Edit</Link> */}
    </section>
}