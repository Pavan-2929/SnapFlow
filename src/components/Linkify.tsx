import Link from "next/link";
import React from "react";
import { LinkItUrl, LinkIt } from "react-linkify-it";

interface LinkifyProps {
  children: React.ReactNode;
}

const Linkify = ({ children }: LinkifyProps) => {
  return (
    <LinkifyUrl>
      <LinkifyHashtag>
        <LinkifyUsername>{children}</LinkifyUsername>
      </LinkifyHashtag>
    </LinkifyUrl>
  );
};

const LinkifyUrl = ({ children }: LinkifyProps) => {
  return <LinkItUrl>{children}</LinkItUrl>;
};

const LinkifyHashtag = ({ children }: LinkifyProps) => {
  return (
    <LinkIt
      regex={/(#[a-zA-Z0-9]+)/}
      component={(match, key) => (
        <Link
          href={`/hashtag/${match.slice(1)}`}
          key={key}
          className="text-primary hover:underline"
        >
          {match}
        </Link>
      )}
    >
      {children}
    </LinkIt>
  );
};
const LinkifyUsername = ({ children }: LinkifyProps) => {
  return (
    <LinkIt
      regex={/(@[a-zA-Z0-9_-]+)/}
      component={(match, key) => (
        <Link
          href={`/user/${match.slice(1)}`}
          key={key}
          className="text-primary hover:underline"
        >
          {match}
        </Link>
      )}
    >
      {children}
    </LinkIt>
  );
};

export default Linkify;
