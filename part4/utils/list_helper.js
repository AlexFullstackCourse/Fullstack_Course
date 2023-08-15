const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const favBlog = blogs.reduce((prev, current) => {
    return prev.likes > current.likes ? prev : current;
  });
  return favBlog;
};

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => blog.author);
  return authors
    .sort(
      (a, b) =>
        authors.filter((author) => author === a).length -
        authors.filter((author) => author === b).length
    )
    .pop();
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
