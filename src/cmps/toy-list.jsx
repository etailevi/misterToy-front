import ToyPreview from "./toy-preview.jsx"

export default function ToyList({ toys, onRemoveToy, onEditToy, addToCart }) {

    return (
        <ul className="toy-list clean-list flex justify-center">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />

                    <div>
                        <button onClick={() => { onRemoveToy(toy._id) }}>x</button>
                        <button onClick={() => { onEditToy(toy) }}>Edit</button>
                    </div>

                    <button className="buy" onClick={() => { addToCart(toy) }}>
                        Add to Cart
                    </button>
                </li>)}
        </ul>
    )
}