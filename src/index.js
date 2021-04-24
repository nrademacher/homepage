import { displayRepoCards } from './components/repoCards';
import { clAdd, clRm, cn, id } from './utils/domUtils';

(() => {
  displayRepoCards();


  const repos = cn('repo-card');
  const repoFilter = id('project-filter');
  const events = ['onclick', 'onfocus', 'onselect'];
  let prevFilter = id('all');
  clAdd(id('all'), 'active');

  [...repoFilter.children].forEach((filter) => {
    const filterEl = id(filter.id);
    events.forEach((event) => {
      filterEl[event] = () => {
        [...repos].forEach((repo) => {
          clRm(prevFilter, 'active');
          clAdd(filter, 'active');
          prevFilter = filter;
          if (!repo.classList.contains(filter.id)) {
            repo.classList.add('hidden');
            clAdd(repo, 'hidden');
          } else {
            repo.classList.remove('hidden');
            clRm(repo, 'hidden');
          }
        });
      };
    });
  });
})();
