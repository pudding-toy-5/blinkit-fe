export const envApiUrl = import.meta.env.VITE_API_URL as string;

if (!envApiUrl) {
  throw new Error('VITE_API_URL 환경 변수가 설정되지 않았습니다.');
}

export const apiUrl = envApiUrl;
