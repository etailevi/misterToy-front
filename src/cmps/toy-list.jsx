import ToyPreview from "./toy-preview.jsx"

export default function ToyList({ toys, onRemoveToy, onEditToy, addToCart }) {

    return (
        <ul className="toy-list clean-list flex justify-center">

            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy} onRemoveToy={onRemoveToy} onEditToy={onEditToy} addToCart={addToCart} />
                </li>)}
        </ul>
    )
}