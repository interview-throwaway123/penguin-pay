import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInput, HelperText } from 'react-native-paper'
import type { ComponentProps } from 'react'
import { useFormikContext } from 'formik'
import { z } from 'zod'

const isZeroSchema = z.coerce.number().refine((val) => val === 0)

const isNumberSchema = z.coerce.number().gte(0)

export default function CurrencyConversionInput({
  baseLabel,
  baseName,
  quoteLabel,
  quoteName,
  quoteUnit,
  rate,
  disabled,
}: {
  baseLabel: string
  baseName: string
  quoteLabel: string
  quoteName: string
  quoteUnit: string
  rate: number
  disabled: boolean
}) {
  const { values, setFieldValue, errors, touched, isSubmitting } =
    useFormikContext()

  const handleFocus = () => {
    const { success: isBaseZero } = isZeroSchema.safeParse(values[baseName])
    if (isBaseZero) {
      setFieldValue(baseName, '')
    }

    const { success: isQuoteZero } = isZeroSchema.safeParse(values[quoteName])
    if (isQuoteZero) {
      setFieldValue(quoteName, '')
    }
  }

  const handleChange = (base, quote) => {
    if (base !== null) {
      const { success: isValid } = isNumberSchema.safeParse(base)
      if (isValid && base !== values[baseName]) {
        setFieldValue(baseName, base)
        setFieldValue(quoteName, '')
      }
    }

    if (quote !== null) {
      const { success: isValid } = isNumberSchema.safeParse(quote)
      if (isValid && quote !== values[quoteName]) {
        setFieldValue(quoteName, quote)
        setFieldValue(baseName, '')
      }
    }
  }

  const handleBlur = (base, quote) => {
    if (rate === 0) {
      setFieldValue(baseName, 0)
      setFieldValue(quoteName, 0)
      return
    }

    const nextBaseVal =
      base === null
        ? Number((values[quoteName] || 0) / rate)
        : Number(values[baseName])

    const nextQuoteVal =
      quote === null
        ? Number((values[baseName] || 0) * rate)
        : Number(values[quoteName])

    setFieldValue(baseName, nextBaseVal.toFixed(2))
    setFieldValue(quoteName, nextQuoteVal.toFixed(2))
  }

  const hasError =
    (!!touched[baseName] && errors[baseName]) ||
    (!!touched[quoteName] && errors[quoteName])

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          mode="outlined"
          keyboardType="numeric"
          label={baseLabel}
          left={<TextInput.Affix text="$" />}
          value={values[baseName]}
          onFocus={handleFocus}
          onChangeText={(val) => handleChange(val, null)}
          onBlur={() => handleBlur(true, null)}
          error={hasError}
          disabled={disabled || isSubmitting}
          style={styles.base}
        />
        <TextInput
          mode="outlined"
          keyboardType="numeric"
          label={quoteLabel}
          right={<TextInput.Affix text={quoteUnit} />}
          value={values[quoteName]}
          onChangeText={(val) => handleChange(null, val)}
          onBlur={() => handleBlur(null, true)}
          error={hasError}
          disabled={disabled || isSubmitting}
          style={styles.quote}
        />
      </View>
      {hasError && (
        <HelperText type="error">
          {errors[baseName] || errors[quoteName]}
        </HelperText>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
  },
  base: {
    flex: 1,
  },
  quote: { flex: 2 },
})
