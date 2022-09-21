import React from "react"
import Character from "./Character"
import { Link } from "react-router-dom"

function RenderCharacters({ characters }) {
  return (
    <main className="grid mt-2 grid-cols-2 sm:grid-cols-3  md:grid-cols-4  lg:grid-cols-5 gap-2">
      {characters?.map((character, index) => {
        return (
          <Link
            to={`/characters/${
              character.name.toLowerCase().split(" ").join("-") +
              "-" +
              character.char_id
            }`}
            key={index}
            className=" flex flex-col justify-start items-center p-2 sm:hover:scale-105  bg-white bg-opacity-10 text-white">
            <Character character={character} />
          </Link>
        )
      })}
    </main>
  )
}

export default RenderCharacters
