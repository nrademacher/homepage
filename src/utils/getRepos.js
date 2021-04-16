const getRepos = async () => {
  const raw = await fetch('https://api.github.com/users/cxxiii/repos');
  const result = await raw.json();
  return result;
};

export default getRepos
