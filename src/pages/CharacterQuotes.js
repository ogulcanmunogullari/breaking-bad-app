import React, { useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getCharacterQuotes } from "../redux/slicers/quotesSlice"
import Loading from "../components/Loading"

function CharacterQuotes() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const LONG_ID = useParams()
  const { characterQuotes, pending } = useSelector((state) => state.quotes)

  useEffect(() => {
    const SHORT_ID_FOR_QUOTE = LONG_ID.id.split("-").slice(0, -1).join("+")
    dispatch(getCharacterQuotes(SHORT_ID_FOR_QUOTE))
  }, [dispatch, LONG_ID.id])

  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pending === false ? (
        characterQuotes.length > 0 ? (
          characterQuotes.map((quote) => (
            <div className="bg-red-200" key={quote.quote_id}>
              {quote.quote}
            </div>
          ))
        ) : (
          <button
            className="bg-red-200 p-2 col-span-12"
            onClick={() => navigate("/", { replace: true })}>
            No quotes found for this character, click to home page
          </button>
        )
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default CharacterQuotes
