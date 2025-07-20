import { useCallback } from 'react';

export const useConfetti = () => {
  const triggerConfetti = useCallback((element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create confetti particles
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.left = centerX + 'px';
      confetti.style.top = centerY + 'px';
      confetti.style.width = '6px';
      confetti.style.height = '6px';
      confetti.style.backgroundColor = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 5)];
      confetti.style.borderRadius = '50%';
      confetti.style.pointerEvents = 'none';
      confetti.style.zIndex = '9999';
      confetti.style.transform = 'scale(0)';
      confetti.style.transition = 'all 1s ease-out';

      document.body.appendChild(confetti);

      // Animate confetti
      requestAnimationFrame(() => {
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 50 + Math.random() * 50;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity - 100;

        confetti.style.transform = `translate(${x}px, ${y}px) scale(1)`;
        confetti.style.opacity = '0';
      });

      // Remove confetti after animation
      setTimeout(() => {
        if (document.body.contains(confetti)) {
          document.body.removeChild(confetti);
        }
      }, 1000);
    }
  }, []);

  return { triggerConfetti };
};