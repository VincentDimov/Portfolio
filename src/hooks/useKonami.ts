import { useEffect } from 'react'

const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

export const useKonami = (onComplete: () => void) => {
  useEffect(() => {
    let index = 0
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === code[index].toLowerCase()) {
        index += 1
        if (index === code.length) {
          onComplete()
          index = 0
        }
      } else {
        index = event.key.toLowerCase() === code[0].toLowerCase() ? 1 : 0
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onComplete])
}
