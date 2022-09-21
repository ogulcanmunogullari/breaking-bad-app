import React from "react"
import { useDispatch } from "react-redux"
import { changePage, getCharacters } from "../redux/slicers/charactersSlice"
function PageButton({ page, pages }) {
  const dispatch = useDispatch()
  const buttonHandler = (pages) => {
    dispatch(changePage(pages))
    dispatch(getCharacters(pages))
  }
  return (
    <button
      className={` px-5 py-1 rounded-md ${
        pages === page ? "bg-red-500" : "bg-gray-500"
      }`}
      // disabled={pages === page + 1}
      onClick={() => buttonHandler(pages)}>
      {pages + 1}
    </button>
  )
}

export default PageButton
