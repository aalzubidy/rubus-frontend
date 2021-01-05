import { useState } from 'react';

const useInputState = function (initVal) {
    const [value, setValue] = useState(initVal);

    const handleChange = (evt) => {
        setValue(evt.target.value);
    };
    const reset = () => {
        setValue('');
    };

    return [value, handleChange, reset];
}

export default useInputState;
