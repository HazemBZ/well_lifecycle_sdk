import FolderUploader from './FolderUploader'
import style from './path-sink.module.scss'

function PathSink() {
  return (
    <div className={style.sinkContainer}>
      <div className={style.content}>
        <p>
          Drag and drop to upload data or import files from <span>your local server</span>
        </p>
        <FolderUploader />
      </div>
    </div>
  )
}

export default PathSink
