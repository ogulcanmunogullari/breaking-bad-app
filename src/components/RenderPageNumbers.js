import React from "react"
import PageButton from "./PageButton"
import { useDispatch } from "react-redux"
import { getCharacters, changePage } from "../redux/slicers/charactersSlice"

function RenderPageNumbers({ page, pageNumber }) {
  const dispatch = useDispatch()
  const buttonHandler = (page) => {
    dispatch(changePage(page))
    dispatch(getCharacters(page))
  }
  return (
    <div className="flex justify-center items-center place-items-center gap-5 my-5 sm:my-10 flex-wrap">
      {page !== 0 && (
        <>
          <button
            className="text-2xl -mt-2 text-white"
            onClick={() => buttonHandler(page - 1)}>
            {" "}
            &lt;{" "}
          </button>
          <PageButton page={page} pageTo={0} />
        </>
      )}
      {page < pageNumber ? (
        <>
          {page > 2 && <div className=" text-white">...</div>}
          {page > 1 && <PageButton page={page} pageTo={page - 1} />}
          {page !== pageNumber && <PageButton page={page} pageTo={page} />}
          {page + 1 < pageNumber && (
            <PageButton page={page} pageTo={page + 1} />
          )}
          {page === 0 && <PageButton page={page} pageTo={page + 2} />}
          {page < pageNumber - 2 && <div className=" text-white">...</div>}
        </>
      ) : (
        <>
          <div className=" text-white">...</div>
          <PageButton page={page} pageTo={page - 2} />
          <PageButton page={page} pageTo={page - 1} />
        </>
      )}
      <PageButton page={page} pageTo={pageNumber} />
      {page !== pageNumber && (
        <button
          className="text-2xl -mt-2 text-white"
          onClick={() => buttonHandler(page + 1)}>
          {" "}
          &gt;{" "}
        </button>
      )}
    </div>
  )
}

export default RenderPageNumbers
