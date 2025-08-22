import { useContext } from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'
import { PathsContext } from './AddPath/PathsContext'
import { IconButton } from 'components/Button'
import { SVGIcon } from 'components/Icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { Dict } from 'types'
import { EllipsedSpan } from 'components/EllipsedSpan'

function ShowPaths() {
  const { paths, associatedPaths, setPaths, setAssociatedPaths } = useContext(PathsContext)

  return (
    <div className={classNames(styles.showPaths)}>
      <div className={styles.section}>
        <h2>Selected</h2>
        <div className={styles.content}>
          {paths.map(path => (
            <div key={path} className={styles.pathItem}>
              <EllipsedSpan title={path}>{path}</EllipsedSpan>
              <IconButton onClick={() => setPaths(paths.filter(p => p !== path))}>
                <SVGIcon size={15}>
                  <FontAwesomeIcon icon={faCircleXmark} />
                </SVGIcon>
              </IconButton>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.section}>
        <h2>Uploaded</h2>
        <div className={styles.content}>
          {Object.entries(associatedPaths).map(([key, value]) => (
            <div key={key} className={styles.pathItem}>
              <EllipsedSpan title={value}>{value}</EllipsedSpan>
              <IconButton
                onClick={() =>
                  setAssociatedPaths(prev => {
                    let tmp: Dict<string> = JSON.parse(JSON.stringify(prev))
                    for (const item of Object.keys(tmp)) {
                      if (item === key) delete tmp[key]
                    }
                    return {
                      ...tmp,
                    }
                  })
                }
              >
                <SVGIcon size={15}>
                  <FontAwesomeIcon icon={faCircleXmark} />
                </SVGIcon>
              </IconButton>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShowPaths
