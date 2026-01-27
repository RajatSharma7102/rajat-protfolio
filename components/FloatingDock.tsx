import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { FloatingDockClient } from "./FloatingDockClient";

const NAVIGATION_QUERY =
  defineQuery(`*[_type == "navigation"] | order(order asc){
  title,
  href,
  icon,
  isExternal
}`);

export async function FloatingDock() {
  const { data: navItems } = await sanityFetch({ query: NAVIGATION_QUERY });

  if (!navItems || navItems.length === 0) {
    return null;
  }

  // Filter out Achievements, Blogs, and Twitter navigation items
  const filteredNavItems = navItems.filter(
    (item) =>
      item.href !== "#achievements" &&
      item.href !== "#blog" &&
      item.title !== "Twitter",
  );

  return <FloatingDockClient navItems={filteredNavItems} />;
}
