import { GitHubIcon, IconLink, TwitterIcon } from "./Icons";

export function SocialLinks(props: { className?: string; tight?: boolean }) {
  return (
    <div className={`${props.className ?? ""} flex ${props.tight ? "gap-2" : "gap-4"}`}>
      <IconLink
        href="https://github.com/nrademacher"
        title="GitHub"
        icon={GitHubIcon}
      />
      <IconLink
        href="https://twitter.com/nikolay_magnus"
        title="X/Twitter"
        icon={TwitterIcon}
      />
    </div>
  );
}
