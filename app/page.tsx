const STACK = [
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "Vue.js",
  "C# / ASP.NET MVC",
  "SQL",
  "AWS Lambda",
  "Docker",
];

export default function Home() {
  return (
    <>
      <section>
        <header className="mb-12">
          <h1 className="leading-tight text-4xl md:text-5xl text-gray-900 dark:text-white font-semibold">
            Nikolay Rademacher
          </h1>
          <p className="mt-4 paragraph">
            Full-stack software engineer: TypeScript, React, Node.js
          </p>
        </header>
        <p className="mb-8 paragraph">
          Five years building web applications, front to back. Mostly SaaS:
          multi-tenant B2B platforms, greenfield products taken to launch, and
          applications with security requirements (stream encryption, 2FA,
          geographic access restriction).
        </p>
        <p className="mb-8 paragraph">
          Previously at G DATA CyberDefense, Valuedesk, and itemis AG.
        </p>
        <ul className="mb-12 flex flex-wrap gap-x-3 gap-y-2 paragraph">
          {STACK.map((tech, i) => (
            <li key={tech}>
              {tech}
              {i < STACK.length - 1 && (
                <span
                  aria-hidden="true"
                  className="ml-3 text-gray-400 dark:text-gray-600"
                >
                  ·
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="mb-2 text-2xl text-gray-900 dark:text-white font-semibold">
          Available for freelance work
        </h2>
        <p className="mb-8 paragraph">
          Two days per week, remote. €80/hour net.
        </p>
        <p className="paragraph">
          <a href="mailto:rademacher.nikolay@gmail.com" className="link">
            rademacher.nikolay@gmail.com
          </a>
        </p>
      </section>
    </>
  );
}
