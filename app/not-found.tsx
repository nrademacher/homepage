import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page not found" };

// Note: this page is prerendered as `/_not-found`, so it cannot report the
// requested pathname server-side the way the old Fresh `_404` route did.
export default function NotFound() {
  return (
    <p className="paragraph">Sorry, that page could not be found 🙁</p>
  );
}
