import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Carrusel = ({ images = ['https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/e40b6ea6361a1abe28f32e7910f63b66/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5vJZlTSUu7V8HEmiCsRCiaLQjmYJgUl8sGQ&s'] }) => {
    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    if (!images.length) {
        
        return <div>No images available</div>;
    }
    return (
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
            <button onClick={prevSlide} style={{ position: 'absolute', left: 10, top: '50%', zIndex: 1 }}>
                Prev
            </button>
            <button onClick={nextSlide} style={{ position: 'absolute', right: 10, top: '50%', zIndex: 1 }}>
                Next
            </button>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
                <motion.img
                    key={current}
                    src={images[current]}
                    alt={`slide-${current}`}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    style={{ maxHeight: '100%', maxWidth: '100%', borderRadius: 8 }}
                />
            </div>
        </div>
    );
}
export default Carrusel;