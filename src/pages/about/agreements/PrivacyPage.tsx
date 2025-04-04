import DOMPurify from 'dompurify';

import privacyHtml from './privacy.html?raw';

const PrivacyPage = () => {
  const sanitizedHtml = DOMPurify.sanitize(privacyHtml);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default PrivacyPage;
