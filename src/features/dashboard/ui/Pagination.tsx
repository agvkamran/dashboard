import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store";
import { fetchUsersThunk } from "../model/thunks";

export const Pagination = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { totalPages, currentPage } = useSelector(
    (state: RootState) => state.dashboard
  );

  if (totalPages === 0) return null;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      dispatch(fetchUsersThunk(page));
    }
  };

  return (
    <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
      <button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        style={{ marginRight: "8px" }}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            disabled={currentPage === page}
            style={{
              margin: "0 4px",
              padding: "4px 8px",
              background: currentPage === page ? "#ccc" : "#fff",
            }}
          >
            {page}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        style={{ marginLeft: "8px" }}
      >
        Next
      </button>
    </div>
  );
};
