import { tw } from "twind";
import { GitHubIcon, IconLink, TwitterIcon } from "./Icons.tsx";

export function SocialLinks(props: { class?: string; tight?: boolean }) {
  return (
    <div class={tw`${props.class} flex ${props.tight ? "gap-2" : "gap-4"}`}>
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
