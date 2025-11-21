import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { links } from "../data/Sidebar";
import { LinkType } from "../types/Sidebar";

export const useGetLink = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const [link, setLink] = useState<LinkType | null>(null);

  useEffect(() => {
    setLink(
      getLink({ links, pathname: id ? pathname.replace(id, ":id") : pathname })
    );
  }, [pathname, links, id]);

  return link;
};

const getLink = ({
  links,
  pathname,
}: {
  links?: LinkType[];
  pathname: string;
}): LinkType | null => {
  if (!links) return null;
  for (const link of links) {
    if (link.href === pathname) return link;

    if (link.links) {
      const result = getLink({ links: link.links, pathname });
      if (result) return result;
    }
  }
  return null;
};
