import React, { useState, useEffect } from 'react';
import TestimonialCard from '../ui/testimonialCard';
import '../../assets/css/testimonialSection.css';


interface ApiTestimonial {
    id: string;
    imageUrl: string;
    desctiption: string;
}

interface Testimonial {
    id: string;
    imageUrl: string;
    text: string;
    name: string;
    handle: string;
}

const GALLERY_API_URL = import.meta.env.VITE_GALLERY_API_URL;

const mockUserData = [
    { name: 'John Fang', handle: 'wordfaang.com' },
    { name: 'Jane Doe', handle: 'janedoe.design' },
    { name: 'Peter Jones', handle: 'peterjones.dev' },
    { name: 'Emily White', handle: 'emwhite.co' },
    { name: 'Chris Green', handle: 'chrisgreen.io' },
];

const TestimonialSection: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(GALLERY_API_URL);
                if (!response.ok) {
                    throw new Error('Failed to fetch testimonials');
                }
                const data: ApiTestimonial[] = await response.json();

                const formattedData: Testimonial[] = data.slice(0, 5).map((item, index) => {
                    const description = item.desctiption || '';
                    const text = description.length > 150
                        ? description.substring(0, 150) + '...'
                        : description;

                    return {
                        id: item.id,
                        imageUrl: `https://i.pravatar.cc/150?u=${item.id}`,
                        text: text,
                        name: mockUserData[index % mockUserData.length].name,
                        handle: mockUserData[index % mockUserData.length].handle,
                    };
                });
                setTestimonials(formattedData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    if (isLoading) {
        return <section className="testimonial-section"><p>Loading testimonials...</p></section>;
    }

    if (error) {
        return <section className="testimonial-section"><p>Error: {error}</p></section>;
    }

    return (
        <section key="testimonials-loaded" className="testimonial-section" data-aos="fade-up" >
            <div className="testimonial-container">

                <h2 className="testimonial-title">Testimonials</h2>
                <div className="testimonial-slider-container">
                    <div
                        className="testimonial-slider-track"
                        style={{ transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 24}px))` }}
                    >
                        {testimonials.map((testimonial) => (
                            <TestimonialCard key={testimonial.id} {...testimonial} />
                        ))}
                    </div>
                </div>

                <div className="testimonial-dots-container">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`testimonial-dot ${currentIndex === index ? 'active' : ''}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;