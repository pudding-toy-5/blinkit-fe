import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

import FilledExclamation from '@/shared/ui/icons/FilledExclamation';
import FilledSuccess from '@/shared/ui/icons/FilledSuccess';
import { cn } from '@/shared/ui/styles/utils';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      position='bottom-center'
      icons={{
        success: <FilledSuccess size={20} />,
        error: <FilledExclamation size={20} />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: cn(
            'flex flex-row justify-start items-center gap-[8px]',
            'bg-[#555] px-[16px] py-[14px] rounded-[8px]'
          ),
          title: 'text-[13px] text-white',
        },
        duration: 2000,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export default Toaster;
