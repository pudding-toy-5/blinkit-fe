import { describe, it, vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';

import SignInButton from './SignInButton';

describe('SignInButton', () => {
  it('when service is google, renders google text and style.', () => {
    const onClick = vi.fn();
    const { getByText } = render(
      <SignInButton service='google' onClick={onClick} />
    );
    const button = getByText('구글 계정으로 시작하기');

    expect(button).toBeInTheDocument();
  });

  it('when service is naver, renders naver text and style.', () => {
    const onClick = vi.fn();
    const { getByText } = render(
      <SignInButton service='naver' onClick={onClick} />
    );
    const button = getByText('네이버 계정으로 시작하기');

    expect(button).toBeInTheDocument();
  });

  it('when button is clicked, onClick is called.', () => {
    const onClick = vi.fn();
    const { getByText } = render(
      <SignInButton service='naver' onClick={onClick} />
    );
    const button = getByText('네이버 계정으로 시작하기');

    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    expect(onClick).toBeCalledTimes(1);
  });
});
