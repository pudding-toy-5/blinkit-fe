import { cn } from '@/shared/lib/cn';
import { Label } from '@/shared/ui/atoms/label';
import { Textarea } from '@/shared/ui/atoms/textarea';

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
        wrap='hard'
        className={cn(
          'h-30 w-full max-w-full p-4 rounded-xl border rounded-[8px]',
          'text-left leading-normal text-[15px] break-all',
          'resize-none',
          'placeholder:whitespace-pre-line placeholder:text-[#999999] shadow-none',
          'focus-visible:border-[#555555]',
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
