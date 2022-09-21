import React from "react"
import Character from "./Character"
import { Link } from "react-router-dom"

function RenderCharacters({ characters, renderPageNumbers }) {
  return (
    <>
      <main className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4  lg:grid-cols-5 gap-2">
        {characters?.map((character, index) => {
          return (
            <Link
              to={`/characters/${
                character.name.toLowerCase().split(" ").join("-") +
                "-" +
                character.char_id
              }`}
              key={index}
              className="border border-red-400 flex flex-col justify-start items-center p-2">
              <Character character={character} />
            </Link>
          )
        })}
      </main>
      <footer>{renderPageNumbers()}</footer>
    </>
  )
}

export default RenderCharacters
