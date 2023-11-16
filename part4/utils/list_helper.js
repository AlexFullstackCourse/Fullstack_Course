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
  const authorsToSort = authors.slice(0);
  const authorWithMostBlogs = authorsToSort
    .sort(
      (a, b) =>
        authors.filter((author) => author === a).length -
        authors.filter((author) => author === b).length
    )
    .pop();

  const amountMostBlogs = authors.filter(
    (author) => author === authorWithMostBlogs
  ).length;

  return {
    author: authorWithMostBlogs,
    blogs: amountMostBlogs,
  };
};

const mostLikes = (blogs) => {
  const authors = Array.from(new Set(blogs.map((blog) => blog.author)));
  const likesList = [];

  authors.forEach((author) => {
    currentLikes = blogs.reduce(
      (sum, currentBlog) =>
        currentBlog.author === author ? sum + currentBlog.likes : sum,
      0
    );
    likesList.push(currentLikes);
  });

  const indexMostLikes = likesList.indexOf(Math.max.apply(Math, likesList));
  const mostLikedAuthor = authors[indexMostLikes];
  const mostLikes = likesList[indexMostLikes];

  return {
    author: mostLikedAuthor,
    likes: mostLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
