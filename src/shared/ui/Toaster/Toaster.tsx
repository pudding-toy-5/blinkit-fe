import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

import FilledExclamation from '@/shared/ui/icons/FilledExclamation';
import FilledSuccess from '@/shared/ui/icons/FilledSuccess';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      position='bottom-center'
      icons={{
        success: <FilledSuccess />,
        error: <FilledExclamation />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'flex flex-row justify-start gap-2 bg-[#555] px-4 py-3.5 rounded-lg',
          title: 'text-[13px] text-white',
          icon: 'size-5',
        },
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
