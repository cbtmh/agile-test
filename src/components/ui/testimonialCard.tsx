import React from 'react';

interface Testimonial {
    id: string;
    imageUrl: string;
    text: string;
    name: string;
    handle: string;
}

const TestimonialCard: React.FC<Testimonial> = ({ imageUrl, name, handle, text }) => {
  return (
    <div className="testimonial-card">
      <img src={imageUrl} alt={`Testimonial from ${name}`} className="testimonial-avatar" />
      <div className="testimonial-content">
        <div className="testimonial-user-info">
          <p className="testimonial-user-name">{name}</p>
          <p className="testimonial-user-handle">{handle}</p>
        </div>
        <p className="testimonial-card-body">
          {text}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;