import { useState } from 'react';

export const useForm = ( initState ) => {
    
    const [state, setState] = useState( initState );

    /* Event for change data */
    const onChange = ( value, field ) => {
        setState({
            ...state,
            [field]: value
        });
    }

    /* Reset to initial State */
    const clearInput = () => {        
        setState({ ...initState })
    }

    /* Set values to form */
    const setValues = (values) => {
        setState({ ...values })
    }

    return {
        ...state,
        onChange,
        clearInput,
        setValues
    }

}