import { createContext, Dispatch, SetStateAction, PropsWithChildren, useState } from 'react'
import { Dict } from 'types'

interface ContextValues {
  paths: string[]
  setPaths: Dispatch<SetStateAction<string[]>>
  associatedPaths: Dict<string>
  setAssociatedPaths: Dispatch<SetStateAction<Dict<string>>>
}

export const PathsContext = createContext<ContextValues>({
  paths: [],
  setPaths: () => null,
  associatedPaths: {},
  setAssociatedPaths: () => null,
})

const RescanPathsContext = ({ children }: PropsWithChildren) => {
  const [paths, setPaths] = useState<string[]>([])
  const [associatedPaths, setAssociatedPaths] = useState<Dict<string>>({})

  return (
    <PathsContext.Provider value={{ paths, setPaths, associatedPaths, setAssociatedPaths }}>
      {children}
    </PathsContext.Provider>
  )
}

export default RescanPathsContext
