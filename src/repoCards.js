const getRepos = async () => {
  const raw = await fetch("https://api.github.com/users/cxxiii/repos");
  const result = await raw.json();
  return result;
};

export const displayRepoCards = (repos = getRepos()) => {
  repos.then((r) => {
    r.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    // Using object lookups as workaround for PurgeCSS string interpolation issue
    const bgHoverColors = {
      html: "hover:bg-html",
      css: "hover:bg-css",
      javascript: "hover:bg-javascript",
      typescript: "hover:bg-typescript",
      react: "hover:bg-react",
      lua: "hover:bg-lua",
    };
    const textColors = {
      html: "text-html",
      css: "text-css",
      javascript: "text-javascript",
      typescript: "text-typescript",
      lua: "text-lua",
    };
    r.forEach((repo) => {
      if (repo.description && repo.language && !repo.private && repo.name != "dotfiles") {
        const repoCard = document.createElement("a");
        const repoCardHeader = document.createElement("div");
        const repoHeading = document.createElement("h3");
        const repoLang = document.createElement("span");
        const repoText = document.createElement("p");
        repoCard.setAttribute("href", repo.html_url);
        repoCard.setAttribute("target", "_blank");
        repoCard.setAttribute("title", "Go to project");
        repoCard.classList.add("repo-card")
        repoCard.classList.add(repo.language.toLowerCase())
        repoCard.classList.add("all")
        repoCard.classList.add("group");
        repoCard.classList.add("flex");
        repoCard.classList.add("flex-col");
        repoCard.classList.add("p-8");
        repoCard.classList.add("space-y-6");
        repoCard.classList.add("rounded-md");
        repoCard.classList.add("shadow-md");
        repoCard.classList.add("transform");
        repoCard.classList.add("transition-all");
        if (repo.language !== "JavaScript") {
          repoCard.classList.add(bgHoverColors[repo.language.toLowerCase()]);
        } else {
          repoCard.classList.add("hover:bg-gray-900");
        }
        repoCard.classList.add("hover:shadow-xl");
        repoCard.classList.add("hover:scale-105");
        repoCard.classList.add("hover:bg-opacity-95");
        repoCardHeader.classList.add("flex");
        repoCardHeader.classList.add("justify-between");
        if (repo.language !== "JavaScript") {
          repoCardHeader.classList.add("group-hover:text-gray-50");
        } else {
          repoCardHeader.classList.add("group-hover:text-javascript");
        }
        repoHeading.textContent = repo.name;
        repoHeading.classList.add("text-xl");
        repoHeading.classList.add("textShadow-md");
        repoHeading.classList.add("font-normal");
        repoLang.classList.add("font-extralight");
        repoLang.classList.add(textColors[repo.language.toLowerCase()]);
        if (repo.language !== "JavaScript") {
          repoLang.classList.add("group-hover:text-gray-50");
        } else {
          repoLang.classList.add("group-hover:text-javascript");
        }
        repoText.textContent = repo.description;
        repoLang.textContent = repo.language;
        repoText.classList.add("font-light");
        if (repo.language !== "JavaScript") {
          repoText.classList.add("group-hover:text-gray-50");
        } else {
          repoText.classList.add("group-hover:text-javascript");
        }
        repoCardHeader.append(repoHeading, repoLang);
        repoCard.append(repoCardHeader, repoText);
        document.getElementById("repos").appendChild(repoCard);
      }
    });
  });
};
