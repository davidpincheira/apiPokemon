import React, { useState, useCallback, useEffect, useMemo } from 'react'
import fuzzy from 'fuzzy'

export default function Form() {
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [items, setItems] = useState([])

  const handleInput = useCallback((ev) => setSearch(ev.target.value), [])

  useEffect(() => {
    setIsLoading(true)
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
      .then((res) => res.json())
      .then(({ results }) => 
        setItems(results.map(
          ({ name }) => name))
        )
      .catch((err) => 
        console.warn(err.message)
        )
      .finally(() => 
        setIsLoading(false)
      )
  }, [])

  const searchResults = useMemo(
    () => fuzzy.filter(search, items).map(({ original }) => original),
    [search, items]
  )

  return (
        <div className="App">
          {isLoading ? (
            <div>
              <p>Loading Pokemon</p>
              <progress />
            </div>
          ) : (
            <div>
                <div className="container">
                    <div className="card text-center">
                        <div className="card-header">
                            Buscar Pokemon
                        </div>
                        <div className="card-body">
                            <label >Ingresa el nombre del pokemon</label><br />
                            <input type="text" placeholder="nombre" value={search} onChange={handleInput} ></input><br /> <br />
                        </div>
                    </div>
                </div>
                
              {search === '' ? null : searchResults.length ? (
                
                <div className="container">
                  <ul>
                    <div className="card-footer text-muted text-center">
                        Resultados
                    </div>
                    
                    {searchResults.map((item, i) => (
                        <div className="card text-center" style= {{width: '18rem'}} >
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item" key={i} >{item}</li>
                            </ul>
                        </div>
                    ))}
                </ul>
                </div>

              ) : (
                <p>No results</p>
              )}
            </div>
          )}
        </div>
  )
}
