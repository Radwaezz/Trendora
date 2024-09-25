
import './Quality.css';

import Cup from '/icons/cup.jfif';
import Right from '/icons/right.jfif';
import Hand from '/icons/free.jfif';
import Twenty from '/icons/twenty-four.jfif';

function Quality() {
  // Array of feature objects
  const features = [
    {
      icon: Cup,
      title: 'High Quality',
      description: 'Crafted from top materials',
    },
    {
      icon: Right,
      title: 'Warranty Protection',
      description: 'Over 2 years',
    },
    {
      icon: Hand,
      title: 'Free Shipping',
      description: 'Order over $150',
    },
    {
      icon: Twenty,
      title: '24/7 Support',
      description: 'Dedicated support',
    },
  ];

  return (
    <section className="features">
      {features.map((feature, index) => (
        <div key={index} className="feature">
          <img src={feature.icon} alt={feature.title} />
          <div className='feature-content'>
            <h4>{feature.title}</h4>
            <p>{feature.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Quality;
