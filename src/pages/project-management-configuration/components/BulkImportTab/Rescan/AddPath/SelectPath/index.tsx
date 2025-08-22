import axios from 'axios'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { UseModalHook } from 'components/Modal'
import { default as style } from './style.module.scss'
import BreadCrumb from './BreadCrumb'
import Button from 'components/Button'
import Card from 'components/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faFolder, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FILE_SELECTOR_DEFAULT } from 'settings'

function Hilight({ value, pattern }: { value: string; pattern: string }) {
  const index = value.indexOf(pattern)
  const clean = [value.substring(0, index), value.substring(index + pattern.length)]

  return pattern === '' ? (
    <span>{value}</span>
  ) : (
    <span>
      {clean[0]}
      <mark>{pattern}</mark>
      {clean[1]}
    </span>
  )
}

function Error({ error }: { error: string }) {
  return (error && <div className={style.errorPath}>{error}</div>) || null
}

function FolderSelector({
  isLoading,
  selectedPath,
  updatePath,
  folders,
  search = '',
}: {
  isLoading: boolean
  selectedPath: string
  updatePath: Dispatch<SetStateAction<string>>
  folders: string[]
  search: string
}) {
  const breadCrumbs = selectedPath.split('/').filter(folder => Boolean(folder))
  const parentFolder = '/' + breadCrumbs.slice(0, breadCrumbs.length - 1).join('/')

  return isLoading ? (
    <FontAwesomeIcon icon={faSpinner} spin />
  ) : (
    <ul className={style.folderSelector}>
      {selectedPath !== '/' && (
        <li>
          <button onClick={() => updatePath(parentFolder + '/')}>
            <FontAwesomeIcon icon={faArrowLeft} /> ..
          </button>
        </li>
      )}
      {folders
        .filter(folder => folder.toLowerCase().includes(search.toLowerCase()))
        .map(folder => (
          <li key={folder}>
            <button onClick={() => updatePath(selectedPath + folder + '/')}>
              <FontAwesomeIcon icon={faFolder} /> <Hilight value={folder} pattern={search} />
            </button>
          </li>
        ))}
    </ul>
  )
}

function SelectPath({
  defaultPath,
  edit = false,
  onSubmit = () => null,
  modal,
}: {
  defaultPath: string
  edit: boolean
  onSubmit: Dispatch<string>
  modal: UseModalHook
}) {
  const [selectedPath, setSelectedPath] = useState(defaultPath)
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const { visible } = modal

  useEffect(() => setSelectedPath(FILE_SELECTOR_DEFAULT), [visible, defaultPath])
  useEffect(() => setSearch(''), [selectedPath])
  const {
    isLoading,
    isFetching,
    data = [],
  } = useQuery(
    `fetch-${selectedPath}`,
    async () => {
      const res = await axios.post('/list/folder', { path: selectedPath })
      return res.data.data.sort()
    },
    {
      onSuccess: () => setError(''),
      onError: () => setError('You cannot access this folder'),
    }
  )

  return (
    <Card>
      <Card.Body>
        <div className={style.container}>
          <div className={style.body}>
            <BreadCrumb path={selectedPath} update={setSelectedPath} />
            <Error error={error} />
            <input autoFocus value={search} onChange={event => setSearch(event.target.value)} />
            <FolderSelector
              search={search}
              isLoading={isLoading || isFetching}
              selectedPath={selectedPath}
              updatePath={setSelectedPath}
              folders={data}
            />
          </div>
        </div>
      </Card.Body>
      <Card.Footer>
        <div className={style.actions}>
          <Button
            size='md'
            type='submit'
            varient='success'
            onClick={() => {
              onSubmit(selectedPath)
            }}
          >
            {edit ? 'Edit' : 'Confirm'}
          </Button>
          <Button
            size='md'
            varient='danger'
            onClick={() => {
              // TODO: reset to root dir or smt
            }}
          >
            Decline
          </Button>
        </div>
      </Card.Footer>
    </Card>
  )
}
export default SelectPath
