import { Select, SelectProps } from "antd";

import './ApSelectAnt.css';

const ApSelect: React.FC<SelectProps> = ({
  children,
  ...props
}) => {
  const multipleClasses = ['ApSelect'];

  if (props.className) {
    multipleClasses.push(props.className);
  }

  if (children) {
    return (
      <Select {...props} className={multipleClasses.join(' ')}>
        {children}
      </Select>
    )
  }
  return (
    <Select {...props} className={multipleClasses.join(' ')} />
  )
}

export default ApSelect;