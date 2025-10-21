import { ComponentProps } from 'react'
import { View } from 'react-native'
import { Formik, useFormikContext } from 'formik'
import CountryPickerModal from 'react-native-country-picker-modal'

type Props = {
  name: string
}

type CountryPickerProps = Omit<
  ComponentProps<typeof CountryPickerModal>,
  'onClose'
>

export default function CountryPicker({
  name,
  onSelect,
  error,
  disabled,
  ...rest
}: Props & CountryPickerProps) {
  const {
    errors,
    values,
    setFieldValue,
    setFieldTouched,
    touched,
    isSubmitting,
  } = useFormikContext()

  return (
    <View
      pointerEvents={disabled ? 'none' : 'auto'}
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <CountryPickerModal
        {...rest}
        countryCode={values[name]}
        onSelect={({ cca2 }) => {
          onSelect(cca2)
          setFieldValue(name, cca2)
        }}
        onClose={() => setFieldTouched(name)}
        error={error || !!(touched[name] && errors[name])}
      />
    </View>
  )
}
