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
                    src={card.source}
                    draggable="false"
                    alt="Vorderseite"
                />
                <img
                    className="back"
                    src="./img/cover.png"
                    onClick={handleClick}
                    draggable="false"
                    alt="Rückseite"
                />
            </div>
        </div>
    )
}