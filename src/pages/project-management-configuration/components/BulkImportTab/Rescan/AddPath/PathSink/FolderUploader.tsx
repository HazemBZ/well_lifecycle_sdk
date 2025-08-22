import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal, { useModal } from 'components/Modal'
import Space from 'components/Space'
import { ChangeEvent, useContext, useMemo, useRef, useState } from 'react'
import { PathsContext } from '../PathsContext'
import style from './path-sink.module.scss'
import { chunkUploadFiles } from 'helpers/uploadHelpers'
import ProgressBar from 'components/ProgressBar'
import { FullWidth } from 'components/Resizers'

const FolderUploader = () => {
  const [content, setContent] = useState<FileList | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const progressModal = useModal()
  const ref = useRef<HTMLInputElement | null>(null)

  const totalFiles: number = useMemo(() => (content ? Object.keys(content).length : 0), [content])
  const [uploadedFiles, setUploadedFiles] = useState<number>(0)

  const { setAssociatedPaths } = useContext(PathsContext)
  const failureModal = useModal()
  const [isUploading, setUploading] = useState<boolean>(true)

  const handleChange = (c: ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = c.target.files
    setContent(files)

    if (files) {
      progressModal.show()
      setSubmitting(true)
      setUploading(true)
      chunkUploadFiles(
        files,
        (file, file_id) => {
          setAssociatedPaths(prev => ({ ...prev, [file_id]: file.webkitRelativePath }))
          setUploadedFiles(prev => prev + 1)
        },
        () => {
          setUploading(false)
          setTimeout(() => {
            setSubmitting(false)
            progressModal.hide()
          }, 1000)
        }
      )
    }
  }

  return (
    <div>
      <label
        id='upload-proxy'
        className={style.uploaderLabel}
        htmlFor='folder-upload'
        onClick={() => {
          document.getElementById('folder-proxy')?.click()
        }}
      >
        Add path
      </label>
      <input
        id='folder-upload'
        type='file'
        // @ts-expect-error: folders are good
        // eslint-disable-next-line react/no-unknown-property
        directory=''
        webkitdirectory=''
        onChange={handleChange}
        ref={ref}
        style={{ visibility: 'hidden' }}
      />
      {submitting && content && (
        <>
          <Modal modal={progressModal}>
            <Modal.Body>
              <Space>
                {isUploading ? (
                  <>
                    <FontAwesomeIcon spin fontSize={25} icon={faSpinner} />
                    <p>{Math.round((uploadedFiles / totalFiles) * 100)}%</p>
                    <FullWidth>
                      <ProgressBar count={uploadedFiles} total={totalFiles} />
                    </FullWidth>
                  </>
                ) : (
                  <> Finished Uploading</>
                )}
              </Space>
            </Modal.Body>
          </Modal>
          <Modal modal={failureModal}>
            <Modal.Body>
              <Space>Upload failed</Space>
            </Modal.Body>
          </Modal>
        </>
      )}
    </div>
  )
}

export default FolderUploader
