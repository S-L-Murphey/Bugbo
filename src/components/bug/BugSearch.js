import React, { useContext, useRef } from "react"
import { BugContext } from "./BugProvider"
import "./Bug.css"

export const BugSearch = () => {
  const { setSearchTerms } = useContext(BugContext)

  const searchInfo = useRef()
  const handleClick = () => {
      setSearchTerms(searchInfo.current.value)
  }

  return (
    <>
    <div className="search"></div>
      <div className="search__box">
      <input ref={searchInfo} type="text" id="text"
        className="input--wide"
        
        placeholder="Search for ticket by title" />
        <button onClick={handleClick}>Search</button>
        </div>
        
        
        
    </>
  )
}