import Layout from "@/components/custom/layout";
import Title from "@/components/custom/title";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import ListLayout from "@/components/custom/list-layout";

const POSTS_PER_PAGE = 5;

export async function generateStaticParams() {
  const totalPosts = await getAllFilesFrontMatter("posts");
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE);
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

async function fetchData(page) {
  const posts = await getAllFilesFrontMatter("posts");
  const pageNumber = parseInt(page);
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return {
    posts,
    initialDisplayPosts,
    pagination,
  };
}

export default async function PostPage({ params }) {
  const { page } = params;
  const { posts, initialDisplayPosts, pagination } = await fetchData(page);

  const title = "Blog ✍️";
  const subtitle =
    "I share anything that may help others, technologies I'm using and cool things I've made.";

  return (
    <Layout title="Blog - @mrofisr" description={`${title} - ${subtitle}`}>
      <Title title={title} subtitle={subtitle} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </Layout>
  );
}