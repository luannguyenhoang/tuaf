function removeTrailingSlashFromCanonical(linkString: string) {
  return linkString.replace(
    /(link rel="canonical" href="https:\/\/nologin\.tuaf\.vn\/[^/]+)\/"/g,
    '$1"'
  );
}
export const replaceSeoRM = (input: string) => {
  input = removeTrailingSlashFromCanonical(input);
  input = input.replace(
    `link rel="canonical" href="https://nologin.tuaf.vn/`,
    `link rel="canonical" href="https://tuaf.vn/`
  );
  input = input.replace(
    `meta property="og:url" content="https://nologin.tuaf.vn`,
    `meta property="og:url" content="https://tuaf.vn`
  );

  input = input.replace(
    `"@id":"https://nologin.tuaf.vn/#organization"`,
    `"@id":"https://tuaf.vn/#organization"`
  );
  input = input.replace(`https://nologin.tuaf.vn/#logo`, `https://tuaf.vn/#logo`);
  input = input.replace(`https://nologin.tuaf.vn/#website`, `https://tuaf.vn/#website`);
  input = input.replace(`https://nologin.tuaf.vn/#webpage`, `https://tuaf.vn/#webpage`);
  input = input.replace(`"url":"https://nologin.tuaf.vn"`, `"url":"https://tuaf.vn"`);

  input = input.replace(
    `"@type":"WebPage","@id":"https://nologin.tuaf.vn`,
    `"@type":"WebPage","@id":"https://tuaf.vn`
  );

  input = input.replace(
    `#webpage","url":"https://nologin.tuaf.vn`,
    `#webpage","url":"https://tuaf.vn`
  );

  input = input.replace(
    `"mainEntityOfPage":{"@id":"https://nologin.tuaf.vn/`,
    `"mainEntityOfPage":{"@id":"https://tuaf.vn/`
  );
  input = input.replace(
    `"worksFor":{"@id":"https://nologin.tuaf.vn/#organization`,
    `"worksFor":{"@id":"https://tuaf.vn/#organization`
  );

  input = input.replace(`"sameAs":["https://nologin.tuaf.vn"]`, `"sameAs":["https://tuaf.vn"]`);
  input = input.replace('noindex', 'index');
  input = input.replace('nofollow', 'follow');
  return input;
};
