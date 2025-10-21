import { ComponentProps } from 'react'
import { View } from 'react-native'
import { TextInput as PaperTextInput, HelperText } from 'react-native-paper'
import { Formik, useFormikContext } from 'formik'

type TextInputProps = ComponentProps<typeof TextInput> & {
  name: string
  disabled: boolean
}
export default function TextInput({ name, disabled, ...rest }: TextInputProps) {
  const { errors, values, handleChange, handleBlur, touched, isSubmitting } =
    useFormikContext()

  const hasError = !!(touched[name] && errors[name])

  return (
    <View>
      <PaperTextInput
        {...rest}
        value={values[name]}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        error={hasError}
        disabled={disabled || isSubmitting}
      />
      {hasError && <HelperText type="error">{errors[name]}</HelperText>}
    </View>
  )
}
