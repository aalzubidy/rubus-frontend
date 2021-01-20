import { useState } from 'react';

const useInputState = function (initVal) {
    const [value, setValue] = useState(initVal);

    const handleChange = (evt) => {
        setValue(evt.target.value);
    };
    const reset = () => {
        setValue('');
    };
    const overwrite = (val) => {
        setValue(val);
    }

    return [value, handleChange, reset, overwrite];
}

export default useInputState;
