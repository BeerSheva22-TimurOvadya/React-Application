import Clocks from './components/Clocks';
import Input from './components/common/Input';
import InputResult from './model/InputResult';
import { useState } from 'react';
import timeZones from './time-zones';

const App: React.FC = () => {
    const [cities, setCities] = useState<string[]>([]);
    const [inputResult, setInputResult] = useState<InputResult>({ status: 'success', message: '' });

    const submitFn = (inputText: string): InputResult => {
      const matchedZones = timeZones.filter(tz => tz.mainCities.includes(inputText) || tz.countryName.toLowerCase() === inputText.toLowerCase());
      if (matchedZones.length === 0) {
          setInputResult({ status: 'error', message: 'This city or country does not exist in the list.' });
      } else if (matchedZones.length > 1) {
          setInputResult({ status: 'warning', message: 'Multiple time zones found, please enter a specific city.' });
      } else {
          console.log(inputText);
          setCities([...cities, inputText]);
          setInputResult({ status: 'success', message: 'The city was added successfully.' });
      }
      return inputResult;
  }

    return (
        <div>
            <Input
                submitFn={submitFn}
                type="text" placeholder={'Enter city'} buttonTitle='Add'
                inputResult={inputResult} setInputResult={setInputResult}
            />
            <Clocks cities={cities} />
        </div>
    );
};

export default App;
