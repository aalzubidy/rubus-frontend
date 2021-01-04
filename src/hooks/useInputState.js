import { useState } from 'react';

export default (initVla) => {
    const [value, setValue] = useState(initVla);

    const handleChange = (evt) => {
        setValue(evt.target.value);
    };
    const reset = () => {
        setValue('');
    };

    return [value, handleChange, reset];
}