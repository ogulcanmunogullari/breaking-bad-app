import React from "react"
import { useDispatch } from "react-redux"
import { changePage, getCharacters } from "../redux/slicers/charactersSlice"
function PageButton({ page, pageTo }) {
  const dispatch = useDispatch()
  const buttonHandler = (pageTo) => {
    dispatch(changePage(pageTo))
    dispatch(getCharacters(pageTo))
  }
  return (
    <button
      disabled={pageTo === page}
      className={` px-5 py-1 rounded-md ${
        pageTo === page
          ? "bg-red-500 animate-pulse"
          : "bg-gray-500 will-change-transform hover:animate-bounce"
      }`}
      onClick={() => buttonHandler(pageTo)}>
      {pageTo >= 0 && pageTo + 1}
    </button>
  )
}

export default PageButton
