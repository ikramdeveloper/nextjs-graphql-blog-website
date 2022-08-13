import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { getRecentPosts, getSimilarPosts } from "../services";

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) =>
        setRelatedPosts(result)
      );
    } else getRecentPosts().then((result) => setRelatedPosts(result));
  }, [slug, categories]);

  return (
    <section className="bg-white shadow-lg rounded-lg p-8 mb-8">
      <h3 className="text-xl font-semibold mb-8 pb-4 border-b">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {relatedPosts.map((post) => (
        <article key={post.title} className="flex items-center w-full mb-4">
          <figure className="w-16 flex-none">
            <Image
              src={post.featuredImage.url}
              alt={post.title}
              height="60px"
              width="60px"
              className="align-middle rounded-full"
            />
          </figure>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format("MMMM DD, YYYY")}
            </p>
            <Link href={`/post/${post.slug}`} className="text-md">
              {post.title}
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
};
export default PostWidget;
