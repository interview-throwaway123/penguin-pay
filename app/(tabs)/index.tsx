import { useMemo, useState } from 'react'
import {
  Alert,
  ScrollView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  Button,
  Divider,
  Text,
  TextInput as TextInputPaper,
} from 'react-native-paper'
import { Formik } from 'formik'
import { z } from 'zod'
import { withZodSchema } from 'formik-validator-zod'
import CountryPicker from '@/components/formik/CountryPicker'
import TextInput from '@/components/formik/TextInput'
import CurrencyConversionInput from '@/components/formik/CurrencyConversionInput'
import SubmitButton from '@/components/formik/SubmitButton'
import LoadingText from '@/components/ui/loading-text'
import { Countries } from '@/constants/countries'
import useQueryGetRates from '@/api/useQueryGetRates'

const copy = {
  title: 'Send Money',
  sendTo: 'Send money to',
  firstName: 'First Name',
  lastName: 'Last Name',
  phoneNumber: 'Phone Number',
  amountSend: 'You Send',
  amountReceived: 'They Receive',
  send: 'Send',
  sending: 'Sending...',
  rate: (rate, currency) => `1 USD = ${rate || '?'} ${currency}`,
  phoneNumberLength: (length) => `Phone number must be ${length} digits`,
  phoneNumberPrefix: (prefix) => `Phone number must start with +${prefix}`,
  stringMin: (name, min) =>
    `${name} must contain at least ${min} character${min > 1 ? 's' : ''}`,
  stringMax: (name, max) =>
    `${name} must equal or contain less than ${max} character${max > 1 ? 's' : ''}`,
  gt: (name, val) => `${name} must be greater than ${val}`,
  sent: 'Money sent!',
  sentDescription: (amount, currency, recipient) =>
    `Sent ${amount} ${currency} to ${recipient}`,
  ok: 'OK',
  loadingRates: 'Loading rates',
}

const DEFAULT_COUNTRY = Countries[0].code

export default function Index() {
  const insets = useSafeAreaInsets()

  const [selectedCountry, setSelectedCountry] = useState(DEFAULT_COUNTRY)

  const countryConfig = useMemo(
    () => Countries.find((country) => country.code === selectedCountry),
    [selectedCountry],
  )

  const initialValues = useMemo(
    () => ({
      country: selectedCountry,
      firstName: '',
      lastName: '',
      phoneNumber: countryConfig?.phonePrefix || '',
      baseAmount: '0.00',
      quoteAmount: '0.00',
    }),
    [countryConfig],
  )

  const validator = useMemo(
    () =>
      withZodSchema(
        z.strictObject({
          firstName: z
            .string()
            .min(3, copy.stringMin(copy.firstName, 3))
            .max(30, copy.stringMax(copy.firstName, 30)),
          lastName: z
            .string()
            .min(3, copy.stringMin(copy.lastName, 3))
            .max(30, copy.stringMax(copy.lastName, 30)),
          phoneNumber: z
            .string()
            .length(countryConfig.phoneLength, {
              message: copy.phoneNumberLength(countryConfig?.phoneLength),
            })
            .regex(/^\d+$/, {
              message: copy.phoneNumberLength(countryConfig?.phoneLength),
            })
            .refine((val) => val.startsWith(countryConfig?.phonePrefix), {
              message: copy.phoneNumberPrefix(countryConfig?.phonePrefix),
            }),
          baseAmount: z.coerce.number().gt(0, copy.gt(copy.amountSend, 0)),
          quoteAmount: z.coerce.number().gt(0, copy.gt(copy.amountReceived, 0)),
        }),
      ),
    [countryConfig],
  )

  const { data: rates, isLoading } = useQueryGetRates({
    includedRates: Countries.map(({ currency }) => currency),
  })

  const currentRate = rates[countryConfig?.currency]

  const handleSubmit = async (values, formikBag) => {
    await new Promise((res) => setTimeout(res, 500))

    Alert.alert(
      copy.sent,
      copy.sentDescription(
        values['quoteAmount'],
        countryConfig?.currency,
        `${values['firstName']} ${values['lastName']}`,
      ),
      [
        {
          text: copy.ok,
          onPress: () => {
            formikBag.resetForm()
            setSelectedCountry(DEFAULT_COUNTRY)
          },
        },
      ],
    )
  }

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <Formik
        initialValues={initialValues}
        validate={validator}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <>
          <View style={styles.header}>
            <Text variant="headlineLarge" style={styles.title}>
              {copy.title}
            </Text>
          </View>
          <Divider bold style={styles.divider} />
          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
          >
            <>
              <View style={styles.country}>
                <Text variant="titleLarge">{copy.sendTo}:</Text>
                <CountryPicker
                  name="country"
                  countryCodes={Countries.map(({ code }) => code)}
                  onSelect={setSelectedCountry}
                  withFlag
                  withCountryNameButton
                  disabled={isLoading}
                />
              </View>
              <View style={styles.form}>
                <TextInput
                  name="firstName"
                  mode="outlined"
                  maxLength={30}
                  label={copy.firstName}
                  disabled={isLoading}
                />
                <TextInput
                  name="lastName"
                  mode="outlined"
                  maxLength={30}
                  label={copy.lastName}
                  disabled={isLoading}
                />
                <TextInput
                  name="phoneNumber"
                  mode="outlined"
                  label={copy.phoneNumber}
                  left={<TextInputPaper.Affix text="+" />}
                  maxLength={countryConfig?.phoneLength}
                  keyboardType="numeric"
                  disabled={isLoading}
                />

                <CurrencyConversionInput
                  baseLabel={copy.amountSend}
                  baseName="baseAmount"
                  quoteLabel={copy.amountReceived}
                  quoteName="quoteAmount"
                  quoteUnit={countryConfig.currency}
                  rate={currentRate}
                  disabled={isLoading}
                />
              </View>
              <View style={styles.rateContainer}>
                {isLoading ? (
                  <LoadingText variant="bodyLarge" style={styles.rate}>
                    {copy.loadingRates}
                  </LoadingText>
                ) : (
                  <Text variant="bodyLarge" style={styles.rate}>
                    {copy.rate(currentRate, countryConfig.currency)}
                  </Text>
                )}
              </View>
            </>
          </ScrollView>
          <View style={styles.footer}>
            <SubmitButton
              mode="contained"
              whenSubmitting={copy.sending}
              disabled={isLoading}
            >
              {copy.send}
            </SubmitButton>
          </View>
        </>
      </Formik>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 18,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  header: {},
  title: {
    textAlign: 'center',
  },
  divider: {
    marginVertical: 18,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    gap: 16,
  },
  country: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  form: {
    gap: 16,
  },
  rateContainer: {
    paddingTop: 16,
  },
  rate: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    alignContent: 'center',
  },
})
