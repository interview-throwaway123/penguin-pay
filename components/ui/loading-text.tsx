import { ComponentProps, ReactNode, useEffect, useState } from 'react'
import { Text } from 'react-native-paper'

const LoadingText = ({
  children,
  style,
  ...rest
}: ComponentProps<typeof Text>) => {
  const [step, setStep] = useState(0) // 0..3

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s === 4 ? 0 : s + 1)), 250)
    return () => clearInterval(id)
  }, [])

  return (
    <Text {...rest} style={[style, { color: 'grey' }]}>
      {children}
      <Text>
        <Text style={{ color: 'grey', opacity: step >= 1 ? 1 : 0 }}>.</Text>
        <Text style={{ color: 'grey', opacity: step >= 2 ? 1 : 0 }}>.</Text>
        <Text style={{ color: 'grey', opacity: step >= 3 ? 1 : 0 }}>.</Text>
        <Text style={{ color: 'grey', opacity: step >= 4 ? 1 : 0 }}>.</Text>
      </Text>
    </Text>
  )
}

export default LoadingText
