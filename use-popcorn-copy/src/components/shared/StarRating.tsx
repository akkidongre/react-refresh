import { useState } from "react"
import Star from "./Star"

const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
}

const starContainerStyle = {
    display: 'flex'
}

interface Props {
    maxRating?: number,
    color?: string,
    size?: number,
    className?: string,
    messages?: string[],
    defaultRating?: number,
    onSetRating?: (rating: number) => void
}

export default function StarRating({maxRating = 5, color="#fcc419", size=48, className = '', messages = [], defaultRating = 0, onSetRating}: Props) {
    const [rating, setRating] = useState(defaultRating);
    const [tempRating, setTempRating] = useState(0);

    const textStyle = {
        lineHeight: "1",
        margin: "0",
        padding: "0",
        color: color,
        fontSize: `${size/1.5}px`
    }

    const handleSetRating = (index: number) => {
        setRating(index + 1);
        onSetRating && onSetRating(index + 1);
        setTempRating(0);
    }

    return (
        <div style={containerStyle} className={className}>
            <div style={starContainerStyle}>
                {Array.from({length: maxRating}).map((_, index) => (
                    <Star key={index} 
                        full={tempRating ? tempRating >= index + 1 : rating >= index + 1} 
                        color={color}
                        size={size}
                        onRate={() => handleSetRating(index)} 
                        onHover={() => setTempRating(index + 1)} 
                        onHoverOut={() => setTempRating(0)} 
                    />
                ))}
            </div>
            <p style={textStyle}>{messages.length === maxRating ? messages[tempRating ? tempRating - 1 : rating - 1] : tempRating || rating || ''}</p>
        </div>
    )
}