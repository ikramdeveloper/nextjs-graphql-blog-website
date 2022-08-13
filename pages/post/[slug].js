import { useRouter } from "next/router";

import { getPosts, getPostDetails } from "../../services";
import {
  PostDetail,
  PostWidget,
  Categories,
  Author,
  Comments,
  CommentForm,
  Loader,
} from "../../components";

const PostDetails = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) return <Loader />;

  return (
    <div className="container mx-auto px-10 mb-8 ">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <section className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentForm slug={post.slug} />
          <Comments slug={post.slug} />
        </section>
        <section className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.slug}
              categories={post.categories.map((category) => category.slug)}
            />
            <Categories />
          </div>
        </section>
      </div>
    </div>
  );
};
export default PostDetails;

export const getStaticProps = async ({ params }) => {
  const data = await getPostDetails(params.slug);

  return {
    props: { post: data },
  };
};

export const getStaticPaths = async () => {
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
};
