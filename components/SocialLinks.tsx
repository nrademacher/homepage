/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { IconLink, GitHubIcon } from "./Icons.tsx";

export function SocialLinks(props: { class?: string; tight?: boolean }) {
  return (
    <div class={tw`${props.class} flex ${props.tight ? "gap-2" : "gap-4"}`}>
      <IconLink
        href="https://github.com/nrademacher"
        title="GitHub"
        icon={GitHubIcon}
      />
    </div>
  );
}
