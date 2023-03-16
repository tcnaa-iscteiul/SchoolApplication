import { useState } from 'react'

const useInput = (validateValue: (value: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState<string>('')
  const [isTouched, setIsTouched] = useState(false)

  const valueIsValid = validateValue(enteredValue)
  const hasError = !valueIsValid && isTouched

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setEnteredValue(event.target.value)
  }

  const valueBlurHandler = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setIsTouched(true)
  }

  const reset = (): void => {
    setEnteredValue('')
    setIsTouched(false)
  }

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  }
}

export default useInput
