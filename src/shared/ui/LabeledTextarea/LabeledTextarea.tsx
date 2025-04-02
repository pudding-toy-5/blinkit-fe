import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/shared/ui/styles/utils';

export interface LabeledTextareaProps {
  label: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
  state: 'default' | 'focus' | 'completed' | 'error';
  maxLength: number;
}

const LabeledTextarea: React.FC<LabeledTextareaProps> = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  state,
  maxLength,
}) => {
  return (
    <div className='flex flex-col items-center gap-2'>
      <Label
        className='mr-auto text-[15px] text-[#222] font-semibold'
        htmlFor={id}
      >
        {label}
      </Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        value={value}
        maxLength={maxLength}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className={cn(
          'h-38 rounded-xl border text-left leading-normal resize-none text-[15px] p-4',
          'focus:border-[#222]',
          'placeholder:whitespace-pre-line',
          state === 'default' && 'border-[#cccccc]',
          state === 'focus' && 'border-[#555555]',
          state === 'completed' && 'border-[#28a745]',
          state === 'error' && 'border-[#d32f2f]'
        )}
      />
      <span className='flex flex-row ml-auto'>
        <p
          className={cn(
            'text-[#222] text-[13px]',
            state === 'error' && value.length > maxLength && 'text-[#d32f2f]'
          )}
          aria-label='value length'
        >
          {value.length.toString()}
        </p>
        <p aria-label='max length' className='text-[#999] text-[13px]'>
          /{maxLength}
        </p>
      </span>
    </div>
  );
};

export default LabeledTextarea;
