import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getQuotes } from "../redux/slicers/quotesSlice"
import Loading from "../components/Loading"
import Error from "../components/Error"

function Quotes() {
  const { quotes, error, pending } = useSelector((state) => state.quotes)
  console.log(quotes)
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
                <div key={quote.quote_id} className="bg-red-300 relative">
                  <blockquote className="mb-5">{quote.quote}</blockquote>
                  <cite className="absolute font-semibold right-0 bottom-0">
                    -{quote.author}
                  </cite>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Quotes
