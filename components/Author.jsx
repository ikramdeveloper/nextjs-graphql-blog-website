import Image from "next/image";

const Author = ({ author }) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20">
      <figure className="absolute left-0 right-0 -top-14">
        <Image
          src={author.photo.url}
          alt={author.name}
          unoptimized
          height={100}
          width={100}
          className="align-middle rounded-full"
        />
      </figure>

      <h3 className="text-white mt-4 mb-4 my-4 text-xl font-bold">
        {author.name}
      </h3>
      <p className="text-white text-lg">{author.bio}</p>
    </div>
  );
};
export default Author;
