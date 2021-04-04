import { displayRepoCards } from "./repoCards";

(() => {
  displayRepoCards();

  const repos = document.getElementsByClassName("repo-card");
  const repoFilter = document.getElementById("project-filter");
  const events = ["onclick", "onfocus", "onselect"];
  let filterEl;
  let prevFilter = document.getElementById("all");

  for (let filter of repoFilter.children) {
    filterEl = document.getElementById(filter.id);
    events.forEach((event) => {
      filterEl[event] = () => {
        for (let repo of repos) {
            prevFilter.classList.remove("active");
            filter.classList.add("active");
            prevFilter = filter;
          if (!repo.classList.contains(filter.id)) {
            repo.classList.add("hidden");
          } else {
            repo.classList.remove("hidden");
          }
        }
      };
    });
  }
})();
