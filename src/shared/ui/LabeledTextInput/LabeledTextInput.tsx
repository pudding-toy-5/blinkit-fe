import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface LabeledTextInputProps {
  label: string;
  id?: string;
  placeholder?: string;
  value?: string;
  onChange?: () => void;
  disabled?: boolean;
  inputLimit?: number;
}

const LabeledTextInput: React.FC<LabeledTextInputProps> = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  disabled,
  inputLimit,
}) => {
  return (
    <div className='flex flex-col items-center gap-1.5'>
      <Label className='mr-auto text-base' htmlFor={id}>
        {label}
      </Label>
      <Input
        id={id}
        type='text'
        style={{ border: '1px solid #89F336' }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {inputLimit && value && (
        <p className='ml-auto'>
          {value.length}/{inputLimit}
        </p>
      )}
    </div>
  );
};

export default LabeledTextInput;
