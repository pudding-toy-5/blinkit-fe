import DOMPurify from 'dompurify';

import termsHtml from './terms.html?raw';

const TermsPage = () => {
  const sanitizedHtml = DOMPurify.sanitize(termsHtml);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
};

export default TermsPage;
