import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

function CharacterInfo() {
  const [character, setCharacter] = useState({})
  const [error, setError] = useState("")
  const [spoiler, setSpoiler] = useState(false)
  const LONG_ID = useParams()
  let changableId = LONG_ID
  const SHORT_ID = changableId.id.split("-").pop()
  let CHARACTER_NAME = changableId.id.split("-").slice(0, -1).join("-")
  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const res = await axios(
          `${process.env.REACT_APP_API_BASE_ENDPOINT}/characters/${SHORT_ID}`,
        )
        if (res.status === 200) {
          setCharacter(res.data[0])
        }
      } catch (e) {
        setError(e.message)
      }
    }
    fetchCharacter()
  }, [SHORT_ID])

  return (
    <>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <main className="container mx-auto">
            <h1 className="text-center py-2 md:py-5 text-3xl sm:text-4xl md:text-5xl">
              {character.portrayed} - {character.name}
            </h1>
            <div className="p-5 active:p-1 active:my-4">
              <button
                className="py-5 w-full font-semibold rounded-xl shadow-4xl active:ring active:ring-indigo-300 bg-teal-300 hover:bg-purple-500 transition ease-in-out duration-300"
                type="button"
                onClick={() => setSpoiler(!spoiler)}>
                {spoiler ? "Hide" : "Show"} Spoiler
              </button>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div>
                <img
                  src={character.img}
                  className="w-full h-full object-cover"
                  alt={character.name}
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-gray-100 md:col-span-2 lg:col-span-3">
                <div>
                  <h1 className="p-2 bg-red-700 capitalize text-white">show</h1>
                  <p className="p-2"> {character.category} </p>
                </div>
                <div>
                  <h1 className="p-2 bg-red-700 capitalize text-white">Jobs</h1>
                  <p className={`p-2 ${!spoiler && "text-red-700"}`}>
                    {spoiler ? character.occupation?.join(`, `) : `Spoiler`}
                  </p>
                </div>
                <div>
                  <h1 className="p-2 bg-red-700 capitalize text-white">
                    nickname
                  </h1>
                  <p className={`p-2 ${!spoiler && "text-red-700"}`}>
                    {spoiler ? character.nickname : `Spoiler`}
                  </p>
                </div>
                <div>
                  <h1 className="p-2 bg-red-700 capitalize text-white">
                    Seasons
                  </h1>
                  <p className={`p-2 ${!spoiler && "text-red-700"}`}>
                    {spoiler ? character.appearance?.join(`, `) : "Spoler"}
                  </p>
                </div>
                <div>
                  <h1 className="p-2 bg-red-700 capitalize text-white">
                    status
                  </h1>
                  <p className={`p-2 ${!spoiler && "text-red-700"}`}>
                    {spoiler ? character.status : `Spoiler`}
                  </p>
                </div>
                <div>
                  <h1 className="p-2 bg-red-700 capitalize text-white">
                    birthday
                  </h1>
                  <p className="p-2"> {character.birthday} </p>
                </div>

                <Link to={`/quotes/${CHARACTER_NAME + "-"}quotes`}>
                  <h1 className="p-2 bg-red-700 capitalize text-white">
                    Quotes
                  </h1>
                  <p className="p-2 text-blue-700"> Show Quotes... </p>
                </Link>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  )
}

export default CharacterInfo
