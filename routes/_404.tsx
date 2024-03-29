import { UnknownPageProps } from "$fresh/server.ts";
import { DefaultLayout } from "../layouts/DefaultLayout.tsx";
import { tw } from "twind";

export default function NotFoundPage({ url }: UnknownPageProps) {
  return (
    <DefaultLayout pageName="Page not found">
      <p class="paragraph">
        Sorry, the page <em>{url.pathname}</em> could not be found 🙁
      </p>
    </DefaultLayout>
  );
}
