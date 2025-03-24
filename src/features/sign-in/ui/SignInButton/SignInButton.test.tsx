import { describe, it } from 'vitest';
import { render } from '@testing-library/react';

import SignInButton from './SignInButton';

describe('SignInButton', () => {
  it('when service is google, renders google text and style.', () => {
    const { getByText } = render(<SignInButton service='google' />);
    const button = getByText('구글 계정으로 시작하기');

    expect(button).toBeInTheDocument();
  });

  it('when service is naver, renders naver text and style.', () => {
    const { getByText } = render(<SignInButton service='naver' />);
    const button = getByText('네이버 계정으로 시작하기');

    expect(button).toBeInTheDocument();
  });
});
