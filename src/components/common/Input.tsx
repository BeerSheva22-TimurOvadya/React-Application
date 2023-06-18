import { useEffect, useRef, useState } from 'react';
import InputResult from '../../model/InputResult';
import Alert from './Alert';

type Props = {
    submitFn: (inputText: string) => InputResult;
    placeholder: string;
    buttonTitle?: string;
    type?: string;
    inputResult: InputResult;
    setInputResult: (inputResult: InputResult) => void;
};

const Input: React.FC<Props> = ({ submitFn, placeholder, buttonTitle, type, inputResult, setInputResult }) => {
    const inputElementRef = useRef<HTMLInputElement>(null);
    const [disabled, setDisabled] = useState<boolean>(true);

    function onClickFn() {
        submitFn(inputElementRef.current!.value);
    }

    function onChangeFn() {
        setDisabled(!inputElementRef.current?.value);
    }

    function clearMessage() {
        setInputResult({ status: inputResult.status, message: '' });
    }

    return (
        <div>
            <input type={type || 'text'} placeholder={placeholder} ref={inputElementRef} onChange={onChangeFn} />
            <button onClick={onClickFn} disabled={disabled}>{buttonTitle || 'GO'}</button>
            {inputResult.message && <Alert status={inputResult.status} message={inputResult.message} clearMessage={clearMessage} />}
        </div>
    );
};
export default Input;
