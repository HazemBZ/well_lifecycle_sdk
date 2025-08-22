import { Dispatch } from 'react'
import { default as style } from './style.module.scss'

function BreadCrumb({ path = '', update }: { path: string; update: Dispatch<string> }) {
  const breadCrumbs = path.split('/').filter(folder => Boolean(folder))

  return (
    <div className={style.breadCrumbs}>
      <button onClick={() => update('/')}>/</button>
      {breadCrumbs.map((folder, index) => (
        <button onClick={() => update('/' + breadCrumbs.slice(0, index + 1).join('/') + '/')} key={index}>
          {folder}
        </button>
      ))}
    </div>
  )
}

export default BreadCrumb
