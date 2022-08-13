import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const getPosts = async () => {
  const query = gql`
    query GetPosts {
      postsConnection {
        edges {
          node {
            createdAt
            excerpt
            slug
            title
            featuredPost
            featuredImage {
              url
            }
            author {
              name
              bio
              id
              photo {
                url
              }
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.postsConnection.edges;
};

const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        createdAt
        excerpt
        slug
        title
        featuredImage {
          url
        }
        content {
          raw
        }
        author {
          name
          bio
          id
          photo {
            url
          }
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.post;
};

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetFeaturedPosts() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};

export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
      next: posts(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous: posts(
        first: 1
        orderBy: createdAt_DESC
        where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug, createdAt });

  return { next: result.next[0], previous: result.previous[0] };
};

const getRecentPosts = async () => {
  const query = gql`
    query GetRecentPosts() {
      posts(orderBy: createdAt_ASC, last: 3) {
        title
        featuredImage {url}
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.posts;
};

const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetSimilarPosts($slug: String!, $categories: [String]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(graphqlAPI, query, { categories, slug });
  return result.posts;
};

const getCategories = async () => {
  const query = gql`
    query GetCategories() {
      categories {
        name
        slug
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.categories;
};

const postComment = async (obj) => {
  const response = await fetch("/api/comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return response.json();
};

const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });
  return result.comments;
};

export {
  getPosts,
  getRecentPosts,
  getSimilarPosts,
  getCategories,
  getPostDetails,
  postComment,
  getComments,
};
