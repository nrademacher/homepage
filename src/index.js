const getRepos = async () => {
  const raw = await fetch("https://api.github.com/users/cxxiii/repos");
  const result = await raw.json();
  return result;
};

const repos = getRepos();
console.log(repos);

repos.then((r) =>
  r.forEach((r) => {
    if (r.description && r.language && !r.private) {
      const repoCard = document.createElement("a");
      const repoCardHeader = document.createElement("div");
      const repoHeading = document.createElement("h3");
      const repoLang = document.createElement("span");
      const repoText = document.createElement("p");
      repoCard.setAttribute("href", r.html_url);
      repoCard.setAttribute("title", "Go to project");
      repoCard.classList.add("group");
      repoCard.classList.add("flex");
      repoCard.classList.add("flex-col");
      repoCard.classList.add("p-8");
      repoCard.classList.add("space-y-6");
      repoCard.classList.add("rounded-md");
      repoCard.classList.add("shadow-md");
      repoCard.classList.add("transform");
      repoCard.classList.add("transition-all");
      repoCard.classList.add(`hover:bg-${r.language.toLowerCase()}`);
      repoCard.classList.add("hover:shadow-inner");
      repoCard.classList.add("hover:scale-105");
      repoCard.classList.add("hover:bg-opacity-95");
      repoCardHeader.classList.add("flex");
      repoCardHeader.classList.add("justify-between");
      repoCardHeader.classList.add("group-hover:text-gray-50");
      repoHeading.textContent = r.name;
      repoHeading.classList.add("text-xl");
      repoHeading.classList.add("textShadow-md");
      repoHeading.classList.add("font-normal");
      repoLang.classList.add("font-thin");
      repoLang.classList.add(`text-${r.language.toLowerCase()}`);
      repoLang.classList.add("group-hover:text-gray-50");
      repoText.textContent = r.description;
      repoLang.textContent = r.language;
      repoText.classList.add("font-extralight");
      repoText.classList.add("group-hover:text-gray-50");
      repoCardHeader.append(repoHeading, repoLang);
      repoCard.append(repoCardHeader, repoText);
      document.getElementById("repos").appendChild(repoCard);
    }
  })
);
