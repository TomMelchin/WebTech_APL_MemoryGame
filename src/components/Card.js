import './Card.css'

export default function Card({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className="card" key={card.id}>
            <div className={flipped ? "flipped" : null}>
                <img
                    className="front"
                    src={card.src}
                    draggable="false"
                />
                <img
                    className="back"
                    src="/img/cover.png"
                    onClick={handleClick}
                    draggable="false"
                />
            </div>
        </div>
    )
}