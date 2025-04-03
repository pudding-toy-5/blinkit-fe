import DOMPurify from 'dompurify';

import termsHtml from './privacy.html?raw';

const PrivacyPage = () => {
  const sanitizedHtml = DOMPurify.sanitize(termsHtml);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default PrivacyPage;
