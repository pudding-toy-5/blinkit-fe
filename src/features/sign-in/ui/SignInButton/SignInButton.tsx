import { Button } from '@/components/ui/button';
import { cn } from '@/shared/ui/styles/utils';

import { Google, Naver } from './Icons';

export interface SignInButtonProps {
  service: 'google' | 'naver';
}

const SignInButton: React.FC<SignInButtonProps> = ({ service }) => {
  const getServiceText = (service: string) => {
    switch (service) {
      case 'google':
        return '구글';
      case 'naver':
        return '네이버';
      default:
        throw new Error();
    }
  };

  return (
    <Button
      className={cn(
        'h-12',
        service === 'google' &&
          'bg-white text-[#222] text-[15px] border-[#ccc] hover:bg-white/90',
        service === 'naver' &&
          'bg-[#03C75A] text-white text-[15px] border-none hover:bg-[#03C75A]/90'
      )}
    >
      {service === 'google' && <Google />}
      {service === 'naver' && <Naver />}
      {getServiceText(service)} 계정으로 시작하기
    </Button>
  );
};

export default SignInButton;
