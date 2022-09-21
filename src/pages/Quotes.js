import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getQuotes } from "../redux/slicers/quotesSlice"
import Quote from "../components/Quote"
import Loading from "../components/Loading"
import Error from "../components/Error"

function Quotes() {
  const { quotes, error, pending } = useSelector((state) => state.quotes)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getQuotes())
  }, [dispatch])
  return (
    <div className="container mx-auto mt-4">
      {pending && <Loading />}
      {error ? (
        <Error error={error} />
      ) : (
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {quotes.map((quote) => {
              return (
                <Quote
                  key={quote.quote_id}
                  text={quote.quote}
                  author={quote.author}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Quotes
