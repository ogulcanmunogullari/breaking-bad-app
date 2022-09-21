import React, { useEffect, useState } from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { getCharacters, changePage } from "../redux/slicers/charactersSlice"

//Components
import Loading from "../components/Loading"
import Error from "../components/Error"

import PageButton from "../components/PageButton"
import RenderCharacters from "../components/RenderCharacters"

function Characters() {
  const [pageNumber, setPageNumber] = useState()
  const { characters, pending, error, page } = useSelector(
    (state) => state.characters,
  )
  useEffect(() => {
    const fetchCharacters = async () => {
      const res = await axios(
        `${process.env.REACT_APP_API_BASE_ENDPOINT}/characters`,
      )
      const data = await res.data
      const lastNumber = data.length % 10
      if (lastNumber !== 0) {
        setPageNumber((data.length - lastNumber) / 10)
      } else {
        setPageNumber(lastNumber)
      }
    }
    fetchCharacters()
  }, [])
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCharacters())
  }, [dispatch])
  const renderCharacters = () => {
    if (pending) {
      return <Loading />
    }
    if (error) {
      return <Error error={error} />
    }
    if (characters.length > 0) {
      return (
        <RenderCharacters
          renderPageNumbers={renderPageNumbers}
          characters={characters}
        />
      )
    }
  }
  const buttonHandler = (page) => {
    dispatch(changePage(page))
    dispatch(getCharacters(page))
  }
  const renderPageNumbers = () => {
    return (
      <div className="flex justify-center gap-5 my-10">
        {page !== 0 && (
          <>
            <button onClick={() => buttonHandler(page - 1)}> - </button>
            <PageButton page={page} pages={0} />
          </>
        )}

        {page < pageNumber ? (
          <>
            {page > 2 && <div>...</div>}
            {page > 1 && <PageButton page={page} pages={page - 1} />}
            {page !== pageNumber && <PageButton page={page} pages={page} />}
            {page + 1 < pageNumber && (
              <PageButton page={page} pages={page + 1} />
            )}
            {page === 0 && <PageButton page={page} pages={page + 2} />}
            {page < pageNumber - 2 && <div>...</div>}
          </>
        ) : (
          <>
            <div>...</div>
            <PageButton page={page} pages={page - 2} />
            <PageButton page={page} pages={page - 1} />
          </>
        )}
        <PageButton page={page} pages={pageNumber} />
        {page !== pageNumber && (
          <button onClick={() => buttonHandler(page + 1)}>+</button>
        )}
      </div>
    )
  }
  return <div className="container mx-auto mt-2">{renderCharacters()}</div>
}

export default Characters
