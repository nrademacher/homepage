import getRepos from '../utils/getRepos';
import { el, id, linkEl, textEl } from '../utils/domUtils.js';

export const displayRepoCards = (repos = getRepos()) => {
  repos.then((r) => {
    r.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    // Using object lookups as workaround for PurgeCSS string interpolation issue
    const bgHoverColors = {
      html: 'hover:bg-html',
      css: 'hover:bg-css',
      javascript: 'hover:bg-javascript',
      typescript: 'hover:bg-typescript',
      react: 'hover:bg-react',
      lua: 'hover:bg-lua',
    };
    const textColors = {
      html: 'text-html',
      css: 'text-css',
      javascript: 'text-javascript',
      typescript: 'text-typescript',
      lua: 'text-lua',
    };
    r.forEach((repo) => {
      if (
        !repo.fork &&
        !repo.private &&
        repo.language &&
        repo.description &&
        repo.name != 'dotfiles'
      ) {
        const repoCard = linkEl(
          repo.html_url,
          '_blank',
          null,
          `repo-card ${repo.language.toLowerCase()} all group flex flex-col p-8 space-y-6 rounded-md shadow-md transform transition-all ` +
            `${
              repo.language !== 'JavaScript'
                ? `${bgHoverColors[repo.language.toLowerCase()]}`
                : 'hover:bg-gray-900'
            } ` +
            `hover:shadow-xl hover:scale-105 hover:bg-opacity-95`
        );
        repoCard.setAttribute('title', 'Go to project');
        const repoCardHeader = el(
          'div',
          `flex justify-between ` +
            `${
              repo.language !== 'JavaScript'
                ? 'group-hover:text-gray-50'
                : 'group-hover:text-javascript'
            }`
        );
        const repoHeading = textEl(
          'h3',
          repo.name.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase()),
          'text-xl textShadow-md font-normal'
        );
        const repoLang = textEl(
          'span',
          repo.language,
          `font-extralight ${textColors[repo.language.toLowerCase()]} ` +
            `${
              repo.language !== 'JavaScript'
                ? 'group-hover:text-gray-50'
                : 'group-hover:text-javascript'
            }`
        );
        const repoText = textEl(
          'p',
          repo.description,
          `font-light ${
            repo.language !== 'JavaScript'
              ? 'group-hover:text-gray-50'
              : 'group-hover:text-javascript'
          }`
        );
        repoCardHeader.append(repoHeading, repoLang);
        repoCard.append(repoCardHeader, repoText);
        id('repos').append(repoCard);
      }
    });
  });
};
