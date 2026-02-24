import FieldRow from './FieldRow';
import CustomDropDown from '../../UI/CustomDropdown';
const FieldDropdown = ({
  label,
  error,
  list,
  value,
  onChange,
  placeholder,
  readOnly,
}) => (
  <FieldRow label={label} error={error}>
    <CustomDropDown
      list={list}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
    />
  </FieldRow>
);
export default FieldDropdown;
