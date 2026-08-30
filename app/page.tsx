import { SocialLinks } from "@/components/SocialLinks";

export default function Home() {
  return (
    <>
      <section>
        <header className="mb-12 flex flex-col sm:flex-row gap-8 items-center">
          <h1 className="leading-tight text-4xl md:text-5xl text-gray-900 dark:text-white font-semibold">
            Hello 👋
          </h1>
        </header>
        <p className="mb-8 paragraph">
          I&apos;m Nikolay Rademacher, a highly motivated{" "}
          <a href="https://github.com/nrademacher" className="link">
            full-stack software engineer
          </a>
          .
        </p>
        <p className="mb-8 paragraph">
          I have an affinity for efficient, user-friendly web solutions. If you
          want to work with me, need my expertise, or are interested in my
          projects or collaborations, I&apos;m happy to{" "}
          <a href="mailto:rademacher.nikolay@gmail.com" className="link">
            hear from you
          </a>
          .
        </p>
        {
          /*<p className="mb-8 paragraph">
          I occasionally post updates about my projects and learning on my{" "}
          <a href="https://blog.nikolayrademacher.net" className="link">
            blog
          </a>
          .
        </p>*/
        }
      </section>
      <SocialLinks />
    </>
  );
}
