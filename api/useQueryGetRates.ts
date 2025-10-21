import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Currency } from '@/constants/countries'

const APP_ID = '810274f201a14934801f18e34347cd52'

const URL = 'https://openexchangerates.org/api/latest.json'

const copy = {
  oops: 'Oops, something went wrong...',
}

const useQueryGetRates = ({
  includedRates = [],
}: {
  includedRates: Currency[]
} = {}) => {
  const { data, ...rest } = useQuery({
    queryKey: [URL],
    queryFn: async () => {
      const queryParams = new URLSearchParams({
        app_id: APP_ID,
      })

      // Leaving this here to simulate a slow-load
      await new Promise((res) => setTimeout(res, 3000))

      const response = await fetch(`${URL}?${queryParams}`)

      if (!response.ok) {
        throw new Error(copy.oops)
      }

      return response.json()
    },
  })

  const rates = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(data?.rates || {}).filter(([countryCode]) =>
          includedRates.includes(countryCode),
        ),
      ),
    [data?.rates],
  )

  return {
    data: rates,
    ...rest,
  }
}

export default useQueryGetRates
