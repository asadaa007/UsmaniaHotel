import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const reviews = [
  {
    id: 1,
    name: 'Muhammad Asif',
    initial: 'MA',
    color: '#0F3D2E',
    rating: 5,
    date: 'Google Review',
    text: "Tasty, clean, and hygienic food. Chicken Jalfrezi and Daal Mash are outstanding. The portions are generous and the service is always prompt. A true gem of Faisalabad that never disappoints.",
  },
  {
    id: 2,
    name: 'Fahad Rehman',
    initial: 'FR',
    color: '#1A5C44',
    rating: 5,
    date: 'Google Review',
    text: "I have been visiting Usmania since childhood. The taste remains consistent through the years — that's what makes it special. The Chapli Kabab here is the best I have had anywhere in Pakistan.",
  },
  {
    id: 3,
    name: 'Sara Khan',
    initial: 'SK',
    color: '#D4AF37',
    rating: 4,
    date: 'Google Review',
    text: "One of Faisalabad's most iconic traditional restaurants. The ambiance is simple but the food quality is extraordinary. We visit here for family gatherings and everyone always leaves satisfied.",
  },
  {
    id: 4,
    name: 'Bilal Hussain',
    initial: 'BH',
    color: '#2A7A5C',
    rating: 5,
    date: 'Google Review',
    text: "The Malai Boti is absolutely divine — creamy, tender, and perfectly spiced. Usmania Hotel consistently delivers authentic Pakistani flavors at very reasonable prices. Highly recommended!",
  },
  {
    id: 5,
    name: 'Zainab Malik',
    initial: 'ZM',
    color: '#A8890A',
    rating: 4,
    date: 'Google Review',
    text: "Excellent food quality with very reasonable pricing. The drive-through option is very convenient. The Daal Fry here reminds me of home-cooked food — simple, comforting, and absolutely delicious.",
  },
  {
    id: 6,
    name: 'Syed Irfan Zaidi',
    initial: 'SZ',
    color: '#0A4A3A',
    rating: 5,
    date: '7 months ago',
    text: "Tasty and clean hygienic food available. Famous dish is chicken jalfarezy, fry daal mash, malayee boty.",
  },
  {
    id: 7,
    name: 'Raja Waseem',
    initial: 'RW',
    color: '#1D5D42',
    rating: 5,
    date: '5 months ago',
    text: "Ambiance was not really good but was good at all. Order type Dine in.",
  },
  {
    id: 8,
    name: 'اویس',
    initial: 'او',
    color: '#225B4A',
    rating: 5,
    date: 'a year ago',
    text: "Visiting Usmania since childhood, many hotels closed on Mall Road, but Usmania remained through thick n thin.",
  },
  {
    id: 9,
    name: 'Mirza Hamza',
    initial: 'MH',
    color: '#B58923',
    rating: 5,
    date: 'a year ago',
    text: "I enjoy the biryani here — the flavors are rich and the spices are well balanced.",
  },
  {
    id: 10,
    name: 'Raheel Ahmad',
    initial: 'RA',
    color: '#4B6A47',
    rating: 5,
    date: '5 years ago',
    text: "Best place to eat 😋 kafi mazay ka khana ha. open cooking but safia proper nihi ha.",
  },
  {
    id: 11,
    name: 'Ammar Naeem',
    initial: 'AN',
    color: '#8E7C22',
    rating: 5,
    date: 'Edited 4 years ago',
    text: "Thanks dear buddy thanks buddy I hope your next time is good thanks buddy thanks bro buddy I hope your family goes to the beach.",
  },
  {
    id: 12,
    name: 'Kashif Kashi',
    initial: 'KK',
    color: '#5C8F5E',
    rating: 5,
    date: '3 years ago',
    text: "It is a good hotel. All type of dishes are available there like mutton beef and chicken and one more thing about this hotel is service is very quick, you do not have to wait much for your order.",
  },
  {
    id: 13,
    name: 'M Rahat Gujjar',
    initial: 'MG',
    color: '#397355',
    rating: 5,
    date: '3 years ago',
    text: "Great place for food. Not much expensive. Service good. Better food and also Chicken is best here😋.",
  },
  {
    id: 14,
    name: 'Muhammad Abu Zar Ansari',
    initial: 'MA',
    color: '#2D6D4F',
    rating: 5,
    date: '8 months ago',
    text: "Very good nice. Food: 5 Service: …",
  },
  {
    id: 15,
    name: 'Shamshad Akhtar',
    initial: 'SA',
    color: '#486A4E',
    rating: 5,
    date: '10 months ago',
    text: "Good service and good food. Meal type Dinner.",
  },
  {
    id: 16,
    name: 'Muhammad Ijaz Awan',
    initial: 'MI',
    color: '#4B7B51',
    rating: 5,
    date: 'a year ago',
    text: "Good place for wedding ceremony and other events. Meal type Other.",
  },
  {
    id: 17,
    name: 'Jhanzaib Slm',
    initial: 'JS',
    color: '#7F8F61',
    rating: 5,
    date: '2 years ago',
    text: "This hotel is good for those families who are shopping near Anarkali etc. The taste is good. But the atmosphere is not that great.",
  },
  {
    id: 18,
    name: 'A.I. E.S',
    initial: 'AE',
    color: '#6B8B5D',
    rating: 5,
    date: 'a year ago',
    text: "Overall it's a good choice to have eating here! Price per person Rs 1–50.",
  },
  {
    id: 19,
    name: 'Faheem Hometex',
    initial: 'FH',
    color: '#7A8458',
    rating: 5,
    date: '7 years ago',
    text: "Usmania hotel and restaurant is located at west canal road near Amin Town. The area of this unit is approximately 6 kanals divided into two segments. One is reserved for hotel and the other is restaurant.",
  },
  {
    id: 20,
    name: 'Mian Creation',
    initial: 'MC',
    color: '#6A7A55',
    rating: 4,
    date: '3 years ago',
    text: "It was really nice. Food was good but waiter didn't respond quickly. Food: 4.",
  },
  {
    id: 21,
    name: 'Ejaz Wahla',
    initial: 'EW',
    color: '#3F6A4C',
    rating: 5,
    date: 'Edited 5 years ago',
    text: "A great and much better place for food specially with family. Great taste fresh food and also a great meal for the friendship.",
  },
  {
    id: 22,
    name: 'Nabeel Ahmad Awan',
    initial: 'NA',
    color: '#52745A',
    rating: 5,
    date: '7 years ago',
    text: "Best hotel I find in Faisalabad is the Usmania Hotel but there is a problem a bit that chapaties aren't made of good flour. Other things are almost fine as I think.",
  },
  {
    id: 23,
    name: 'Adnan Hamira',
    initial: 'AH',
    color: '#5C7555',
    rating: 5,
    date: '9 months ago',
    text: "Nice 👍👍. Food: 5 Service: 5.",
  },
  {
    id: 24,
    name: 'Muhammad Imran',
    initial: 'MI',
    color: '#4E7A54',
    rating: 5,
    date: '5 years ago',
    text: "Here is a lot of foods available. The karai of chicken is very tasty. Chicken biryani is also tasty.",
  },
  {
    id: 25,
    name: 'Engr Umar Rajput',
    initial: 'EU',
    color: '#4D7754',
    rating: 5,
    date: '6 years ago',
    text: "Nice hotel and environment. Very comfortable environment for meetings. But the food quality & taste must improve.",
  },
  {
    id: 26,
    name: 'Imran Guryon',
    initial: 'IG',
    color: '#6A8759',
    rating: 4,
    date: '5 years ago',
    text: "Everything is overpriced and the quality is not good enough as compared to the price. In easy words, not a value for money place.",
  },
  {
    id: 27,
    name: 'Ihsan Rasool',
    initial: 'IR',
    color: '#5E7B55',
    rating: 5,
    date: '7 years ago',
    text: "Our 1st priority during hostel days... Cheap rates but have quality of food.",
  },
  {
    id: 28,
    name: 'Syed Arslan Ali Zanjani',
    initial: 'SA',
    color: '#4A7250',
    rating: 5,
    date: '7 years ago',
    text: "Best place for good quality food.",
  },
  {
    id: 29,
    name: 'Dr. Usman Khan',
    initial: 'DU',
    color: '#607A58',
    rating: 5,
    date: '6 years ago',
    text: "Good taste but their qourma is better than other hotels of this area.",
  },
  {
    id: 30,
    name: 'Abdullah Siyaal',
    initial: 'AS',
    color: '#597051',
    rating: 5,
    date: '6 years ago',
    text: "Best friendly service with fun. Definitely one should try sometimes here.",
  },
  {
    id: 31,
    name: 'JUNAID Aly123',
    initial: 'JA',
    color: '#5E7E5A',
    rating: 4,
    date: '4 years ago',
    text: "Taste good but not excellent. Average taste, not bad.",
  },
  {
    id: 32,
    name: 'Abdul Majid',
    initial: 'AM',
    color: '#5A6F52',
    rating: 2,
    date: '6 years ago',
    text: "Don't like Usmania hotel. Food stuff tasteless all the time and food quality is not good.",
  },
  {
    id: 33,
    name: 'Abdul Razzaq Jakhar',
    initial: 'AJ',
    color: '#4E7A57',
    rating: 5,
    date: 'a year ago',
    text: "Usmania hotel is most famous place for party dinner and functions.",
  },
  {
    id: 34,
    name: 'Muhammad Asad',
    initial: 'MA',
    color: '#4C7751',
    rating: 5,
    date: '7 years ago',
    text: "Good place for food, not better.",
  },
  {
    id: 35,
    name: 'Chemistry',
    initial: 'CH',
    color: '#667D5C',
    rating: 5,
    date: '7 years ago',
    text: "Very good restaurant offers wide range of food with very beautiful and delicious supplements.",
  },
];

function Stars({ count }) {
  return (
    <span>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < count ? '#D4AF37' : 'rgba(212,175,55,0.25)', fontSize: '16px' }}>★</span>
      ))}
    </span>
  );
}

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => (c + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const go = (idx) => {
    setCurrent(idx);
  };

  return (
    <section
      id="reviews"
      ref={ref}
      style={{
        background: 'linear-gradient(160deg, #0F3D2E 0%, #1E1E1E 60%, #1E1E1E 100%)',
        padding: '100px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative elements */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'rgba(212,175,55,0.04)',
        border: '1px solid rgba(212,175,55,0.08)',
      }} />
      <div style={{
        position: 'absolute', bottom: '-60px', left: '-60px',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'rgba(15,61,46,0.3)',
        border: '1px solid rgba(212,175,55,0.06)',
      }} />

      {/* Giant quote */}
      <div style={{
        position: 'absolute', top: '60px', left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '200px', color: 'rgba(212,175,55,0.04)',
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
      }}>"</div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '70px' }}
        >
          <p style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '4px', fontWeight: 600, marginBottom: '14px' }}>
            WHAT PEOPLE SAY
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            color: '#FFFFFF',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            lineHeight: 1.2,
          }}>
            Voices of Our{' '}
            <span style={{ color: '#D4AF37' }}>Loyal Customers</span>
          </h2>
        </motion.div>

        {/* Review Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '60px',
        }}>
          {reviews.slice(0, 3).map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -6, borderColor: 'rgba(212,175,55,0.4)' }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '20px',
                padding: '32px',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Quote icon */}
              <div style={{ color: '#D4AF37', fontSize: '32px', lineHeight: 1, marginBottom: '16px', fontFamily: 'serif' }}>"</div>

              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: 1.75, marginBottom: '24px', fontStyle: 'italic' }}>
                {review.text}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: `linear-gradient(135deg, ${review.color}, ${review.color}88)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 700, fontSize: '16px',
                  flexShrink: 0,
                  border: '2px solid rgba(212,175,55,0.3)',
                }}>
                  {review.initial}
                </div>
                <div>
                  <div style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '15px' }}>{review.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                    <Stars count={review.rating} />
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>{review.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured large review */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.1) 0%, rgba(15,61,46,0.4) 100%)',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: '24px',
            padding: '48px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
          }} />

          <div style={{ marginBottom: '24px' }}>
            <Stars count={5} />
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{
                fontFamily: "'Playfair Display', serif",
                color: '#FFFFFF',
                fontSize: 'clamp(18px, 2.5vw, 24px)',
                lineHeight: 1.6,
                maxWidth: '700px',
                margin: '0 auto 28px',
                fontStyle: 'italic',
              }}
            >
              "{reviews[current].text}"
            </motion.p>
          </AnimatePresence>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: `linear-gradient(135deg, ${reviews[current].color}, ${reviews[current].color}88)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: '16px',
              border: '2px solid rgba(212,175,55,0.4)',
            }}>
              {reviews[current].initial}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ color: '#D4AF37', fontWeight: 600 }}>{reviews[current].name}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>{reviews[current].date}</div>
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                style={{
                  width: i === current ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === current ? '#D4AF37' : 'rgba(212,175,55,0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          style={{
            textAlign: 'center',
            marginTop: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
          }}
        >
          <div style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(212,175,55,0.25)',
            borderRadius: '12px',
            padding: '16px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <span style={{ color: '#D4AF37', fontSize: '28px', fontWeight: 700 }}>4.0</span>
            <div>
              <Stars count={4} />
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '2px' }}>619+ Reviews on Google</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
