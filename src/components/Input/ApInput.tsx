import { Input, InputProps } from "antd";

import './ApInputAnt.css';

const ApInput: React.FC<InputProps> = (props) => {
  const multipleClasses = ['ApInput'];

  if (props.className) {
    multipleClasses.push(props.className);
  }
  return (
    <Input {...props} className={multipleClasses.join(' ')}/>
  )
}

export default ApInput;