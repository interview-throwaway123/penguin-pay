export type Currency = 'KES' | 'NGN' | 'TZS' | 'UGX'

export interface CountryConfig {
  name: string
  code: string
  currency: Currency
  phonePrefix: string
  phoneLength: number
}
export const Countries: CountryConfig[] = [
  {
    name: 'Kenya',
    code: 'KE',
    currency: 'KES',
    phonePrefix: '254',
    phoneLength: 12,
  },
  {
    name: 'Nigeria',
    code: 'NG',
    currency: 'NGN',
    phonePrefix: '234',
    phoneLength: 10,
  },
  {
    name: 'Tanzania',
    code: 'TZ',
    currency: 'TZS',
    phonePrefix: '255',
    phoneLength: 12,
  },
  {
    name: 'Uganda',
    code: 'UG',
    currency: 'UGX',
    phonePrefix: '256',
    phoneLength: 10,
  },
]
