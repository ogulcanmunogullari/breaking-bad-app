import React from "react"

function Character({ character }) {
  return (
    <>
      <h1 className="my-2">
        {character.name} - {character.nickname}
      </h1>
      <img
        className="w-2/3"
        src={character.img}
        title={character.name}
        alt={character.name}
      />
    </>
  )
}

export default Character
