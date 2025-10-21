import { ComponentProps } from 'react'
import { Button } from 'react-native-paper'
import { Formik, useFormikContext } from 'formik'

type Props = {
  whenSending: string
  disabled: boolean
}

type PaperButtonProps = ComponentProps<typeof Button>
export default function SubmitButton({
  children,
  whenSubmitting,
  disabled,
  ...rest
}: Props & PaperButtonProps) {
  const { submitForm, isSubmitting } = useFormikContext()

  return (
    <Button {...rest} onPress={submitForm} disabled={disabled || isSubmitting}>
      {isSubmitting ? whenSubmitting || children : children}
    </Button>
  )
}
