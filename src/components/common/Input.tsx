import { useEffect, useRef, useState } from 'react';
import InputResult from '../../model/InputResult';

type Props = {
    submitFn: (inputText: string) => InputResult;
    placeholder: string;
    buttonTitle?: string;
    type?: string;
};

const Input: React.FC<Props> = ({ submitFn, placeholder, buttonTitle, type }) => {
    const inputElementRef = useRef<HTMLInputElement>(null);
    const [disabled, setDisabled] = useState<boolean>(true);
    const [message, setMessage] = useState<string>("");
    
    function onClickFn() {
       const res = submitFn(inputElementRef.current!.value);
       setMessage(res.message || '');
       res.message && setTimeout(() => setMessage(''), 5000);
    }

    function onChangeFn(){
        setDisabled(!inputElementRef.current?.value);
    }

    return (
        <div>
            <input type={type || 'text'} placeholder={placeholder} ref={inputElementRef} 
            onChange={onChangeFn}/>
            <button onClick={onClickFn} disabled={disabled}>{buttonTitle || 'GO'}</button>
            {message && <p>{"success"} {message}</p>}
        </div>
    );
};
export default Input;

// компонента которая получает состояние. Если ворнинг - не ярко желтого, саксес - зеленого, ерор - не ярко красным
// сюда <p>{"success"} {message}</p> установить компоненту, которая принимает статус и значение как постоянные значениние?
// применить импут для коняигурации значения часов
// сколько часов, задается в конфигурации. должна быть настройка часов
// если пользователь ничего не вводит, то остается та которая задана клоксом
// если пользователь вводит какуюто временную зону
// алерт - ошибка, суцефул - все норм