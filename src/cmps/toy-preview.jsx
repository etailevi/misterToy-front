export default function ToyPreview({ toy }) {
    return (
        <article className="toy-preview">
            <h4>{toy.name}</h4>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <div>
                {toy.labels.map((label, idx) =>
                    <label key={idx}>{label}</label>
                )}
        </div>
        </article >
    )
}