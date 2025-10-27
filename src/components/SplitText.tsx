import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  from?: Record<string, any>;
  to?: Record<string, any>;
  tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  onLetterAnimationComplete?: () => void;
}

const SplitText = ({
  text,
  className = '',
  delay = 80,
  duration = 0.8,
  ease = 'power2.out',
  from = { opacity: 0, y: 20, scale: 0.8 },
  to = { opacity: 1, y: 0, scale: 1 },
  tag = 'h1',
  onLetterAnimationComplete
}: SplitTextProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || !text) return;
    
    const el = ref.current;
    
    try {
      // Dividir texto em caracteres
      const chars = text.split('').map((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = `translateY(${from.y || 20}px) scale(${from.scale || 0.8})`;
        return span;
      });

      // Limpar e adicionar caracteres
      el.innerHTML = '';
      chars.forEach(char => el.appendChild(char));

      // Animar com GSAP
      gsap.to(chars, {
        opacity: to.opacity || 1,
        y: to.y || 0,
        scale: to.scale || 1,
        duration,
        ease,
        stagger: delay / 1000,
        delay: 0.5,
        onComplete: () => {
          onLetterAnimationComplete?.();
        }
      });
    } catch (error) {
      // Fallback: mostrar texto normal se houver erro
      console.warn('SplitText animation failed, showing normal text:', error);
      el.innerHTML = text;
      el.style.opacity = '1';
    }

    return () => {
      if (el) {
        el.innerHTML = text;
      }
    };
  }, [text, delay, duration, ease, JSON.stringify(from), JSON.stringify(to), onLetterAnimationComplete]);

  const TagComponent = tag as keyof JSX.IntrinsicElements;

  return (
    <TagComponent
      ref={ref as any}
      className={className}
      style={{
        display: 'inline-block',
        overflow: 'hidden'
      }}
    >
      {text}
    </TagComponent>
  );
};

export default SplitText;