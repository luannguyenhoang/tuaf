import sanitizeHtml from 'sanitize-html';

export const clean = (dirty: string) =>
  sanitizeHtml(dirty, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'],
      '*': ['class', 'id'],
    },
    allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'tel'],
    selfClosing: ['img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta'],
  });
