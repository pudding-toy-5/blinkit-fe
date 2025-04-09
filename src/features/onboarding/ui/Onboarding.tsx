import React, { useEffect, useRef, useState } from 'react';

interface OnboardingProps {
  onComplete?: () => void;
}

const TOTAL_SLIDES = 3;
const imageUrls = [
  '/images/onboarding/1/1@3x.png',
  '/images/onboarding/2/2@3x.png',
  '/images/onboarding/3/3@3x.png',
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES - 1) {
      if (onComplete) onComplete();
      return;
    }
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlide === 0) return;
    setCurrentSlide((prev) => prev - 1);
  };

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = 'all 0.5s ease-in-out';
      slideRef.current.style.transform = `translateX(-${String(currentSlide * 100)}%)`;
    }
  }, [currentSlide]);

  // 터치 슬라이드 이벤트 처리를 위한 상태와 핸들러
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // 왼쪽으로 스와이프
      nextSlide();
    }

    if (touchStart - touchEnd < -75) {
      // 오른쪽으로 스와이프
      prevSlide();
    }
  };

  return (
    <div className='w-full h-full flex flex-col'>
      <div
        className='w-full flex-1 overflow-hidden relative'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div ref={slideRef} className='w-full h-full flex'>
          {imageUrls.map((url, index) => (
            <div key={index} className='w-full h-full flex-shrink-0'>
              <img
                src={url}
                alt={`온보딩 이미지 ${String(index + 1)}`}
                className='w-full h-full object-cover'
              />
            </div>
          ))}
        </div>
      </div>

      {/* 인디케이터 */}
      <div className='flex justify-center items-center py-6'>
        {Array.from({ length: TOTAL_SLIDES }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              currentSlide === index ? 'bg-blue-500' : 'bg-gray-300'
            }`}
            onClick={() => {
              setCurrentSlide(index);
            }}
          />
        ))}
      </div>

      {/* 건너뛰기 & 다음 버튼 */}
      <div className='flex justify-between px-6 pb-10'>
        {currentSlide < TOTAL_SLIDES - 1 ? (
          <>
            <button className='text-gray-500' onClick={onComplete}>
              건너뛰기
            </button>
            <button
              className='bg-blue-500 text-white px-4 py-2 rounded-lg'
              onClick={nextSlide}
            >
              다음
            </button>
          </>
        ) : (
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-lg w-full'
            onClick={onComplete}
          >
            시작하기
          </button>
        )}
      </div>
    </div>
  );
}
