export function custom(node: HTMLElement, { delay }: { delay: number }): SvelteAnimationReturnType {
  return {
    delay,
    css: t => {
      return `
        opacity: ${t}; 
        transform: scale(${t});
      `;
    },
  };
}
