import { useState } from 'react';

const useInput = (validateValue: (value: string | boolean) => boolean) => {

    const [enteredValue, setEnteredValue] = useState<string>('');
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

   

    const valueChangeHandler = (event: any): void => {
        setEnteredValue(event.target.value);
    };

    const valueBlurHandler = (event: any): void => {
        setIsTouched(true);
    };

    const reset = (): void => {
        setEnteredValue('');
        setIsTouched(false);
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError: hasError,
        valueChangeHandler: valueChangeHandler,
        valueBlurHandler: valueBlurHandler,
        reset: reset
    }
}

export default useInput;
