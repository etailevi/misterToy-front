import { Link } from "react-router-dom";
import { createClient } from 'pexels';
const client = createClient('dQdbYUNMcmqoGHD35JxMykLVIpeVCX7GrRMq7KAvJr6utpGh7D4xgZni');

export default function ToyPreview({ toy, onRemoveToy, addToCart }) {

    // let promiseImgUrl = client.photos.show({ id: 2014422 })
    //     .then(photo => photo.src.original)
    //     .catch(console.log('Image not found'))

    // let imgUrl = promiseImgUrl.then(img => {
    //     console.log(img)
    //     return img
    // })
    const robohashUrl = `https://robohash.org/${toy._id}?set=set2&size=200x200`
    return (
        <article className="toy-preview">
            <h4>{toy.name}</h4>

            <img src={robohashUrl}></img>
            {/* <img src={imgUrl} alt="" /> */}
            <div className='preview-details'>
                <p>${toy.price.toLocaleString()}</p>
                <div className='preview-labels'>
                    {toy.labels.map((label, idx) =>
                        <label key={idx}>{label}</label>
                    )}
                </div>
                <div className='btn-preview-wrapper'>
                    <button>
                        <Link to={`/toy/${toy._id}`}>Details</Link>
                    </button>
                    <button>
                        <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                    </button>
                    <button onClick={() => { onRemoveToy(toy._id) }}>x</button>
                </div>
                <button className="btn-buy" onClick={() => { addToCart(toy) }}>
                    Add to Cart
                </button>
            </div>
        </article >
    )
}