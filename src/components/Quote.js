import React from "react"

function Quote({ text, author }) {
  return (
    <div className="text-white p-2 border border-opacity-10 border-white relative">
      <blockquote className={`${author && "mb-3"}`}>{text}</blockquote>
      {author && (
        <cite className="absolute font-semibold right-0 bottom-0">
          -{author}
        </cite>
      )}
    </div>
  )
}

export default Quote
