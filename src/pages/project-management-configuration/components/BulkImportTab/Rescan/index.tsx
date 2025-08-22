import styles from './styles.module.scss'
import Modal, { UseModalHook } from 'components/Modal'
import AddPath from './AddPath'
import classNames from 'classnames'
import ShowPaths from './ShowPaths'
import Button from 'components/Button'
import { PathsContext } from './AddPath/PathsContext'
import { useContext } from 'react'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { myProjectStore } from 'store/myProjectStore'

function Rescan({ modal }: { modal: UseModalHook }) {
  const { id: projectId } = useParams()

  const { paths, associatedPaths, setPaths, setAssociatedPaths } = useContext(PathsContext)
  const { getProject, updateProject } = myProjectStore()
  const project = getProject(Number(projectId))

  const resetPaths = () => {
    setPaths([])
    setAssociatedPaths({})
  }

  const { mutate } = useMutation(['rescan-project', projectId], () => {
    updateProject({ ...project, scan_status: 'In Progress' })
    const payload = {
      project_id: projectId,
      listpaths: paths,
      associated_files: Object.keys(associatedPaths),
    }
    return axios.post('projects/upload_list_paths/', payload)
  })

  return (
    <>
      <Modal modal={modal}>
        <Modal.Body>
          <div className={classNames(styles.container)}>
            <div className={styles.pathsSection}>
              <h1>Selected paths</h1>
              <ShowPaths />
            </div>
            <div style={{ width: 'inherit' }}>
              <h1>Selection menu</h1>
              <AddPath modal={modal} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer center>
          <Button
            varient='success'
            onClick={() => {
              mutate()
              modal.hide()
              resetPaths()
            }}
          >
            Confirm
          </Button>
          <Button
            varient='danger'
            onClick={() => {
              modal.hide()
              resetPaths()
            }}
          >
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Rescan
