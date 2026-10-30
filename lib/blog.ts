import { shopifyFetch } from "lib/shopify";
import type { Image } from "lib/shopify/types";

export const BLOG_HANDLE = "news";

export type Article = {
  handle: string;
  title: string;
  excerpt: string | null;
  publishedAt: string;
  image: Image | null;
  contentHtml?: string;
  authorV2?: { name: string } | null;
  seo?: { title: string | null; description: string | null } | null;
};

const ARTICLE_FIELDS = /* GraphQL */ `
  handle
  title
  excerpt
  publishedAt
  image {
    url
    altText
    width
    height
  }
`;

export async function getArticles(): Promise<Article[]> {
  const res = await shopifyFetch<{
    data: { blog: { articles: { nodes: Article[] } } | null };
    variables: { handle: string };
  }>({
    query: /* GraphQL */ `
      query getArticles($handle: String!) {
        blog(handle: $handle) {
          articles(first: 50, sortKey: PUBLISHED_AT, reverse: true) {
            nodes {
              ${ARTICLE_FIELDS}
            }
          }
        }
      }
    `,
    variables: { handle: BLOG_HANDLE },
  });
  return res.body.data.blog?.articles.nodes ?? [];
}

export async function getArticle(handle: string): Promise<Article | null> {
  const res = await shopifyFetch<{
    data: { blog: { articleByHandle: Article | null } | null };
    variables: { blog: string; handle: string };
  }>({
    query: /* GraphQL */ `
      query getArticle($blog: String!, $handle: String!) {
        blog(handle: $blog) {
          articleByHandle(handle: $handle) {
            ${ARTICLE_FIELDS}
            contentHtml
            authorV2 {
              name
            }
            seo {
              title
              description
            }
          }
        }
      }
    `,
    variables: { blog: BLOG_HANDLE, handle },
  });
  return res.body.data.blog?.articleByHandle ?? null;
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
