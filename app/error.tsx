"use client";

export default function Error() {
  return (
    <>
      <p className="mb-4 paragraph">
        Sorry, it looks like there was an error 🙁
      </p>
      <p className="paragraph">
        Please try again later, or else please{" "}
        <a href="mailto:rademacher.nikolay@gmail.com" className="link">
          email me
        </a>{" "}
        if the error persists.
      </p>
    </>
  );
}
