interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pages.push(i);
  }

  return (
    <nav className="flex justify-center">
      <ul className="inline-flex items-center -space-x-px cursor-pointer">
        {pages.map((page, i) => (
          <li
            className={`px-3 py-2 leading-tight border border-black dark:border-white ${
              page == currentPage
                ? "bg-black dark:bg-white text-white dark:text-black"
                : "text-black dark:text-white"
            }`}
            key={i}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
