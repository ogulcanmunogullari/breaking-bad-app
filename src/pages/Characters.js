import React, { useEffect, useState } from "react"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { getCharacters } from "../redux/slicers/charactersSlice"

//Components
import Loading from "../components/Loading"
import Error from "../components/Error"

import RenderCharacters from "../components/RenderCharacters"
import RenderPageNumbers from "../components/RenderPageNumbers"

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

  return (
    <div className="container relative mx-auto flex flex-col-reverse sm:flex-col sm:justify-between">
      <main>
        {pending && <Loading />}
        {error && <Error error={error} />}
        {characters.length > 0 && !error && (
          <RenderCharacters characters={characters} />
        )}
      </main>
      <footer className="sticky top-0 bg-gray-800 sm:relative sm:mt-14">
        <RenderPageNumbers page={page} pageNumber={pageNumber} />
      </footer>
    </div>
  )
}

export default Characters
