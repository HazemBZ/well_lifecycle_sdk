import VTabsPage from 'components/VerticalTabs'
import { faCloudUpload, faNetworkWired, faServer } from '@fortawesome/free-solid-svg-icons'
import { UseModalHook } from 'components/Modal'
import PathSink from './PathSink'
import SelectPath from './SelectPath'
import { useContext } from 'react'
import { PathsContext } from './PathsContext'
import styled from 'styled-components'

const MaxSizer = styled.div`
  height: 100%;
  min-width: 450px;
  max-width: 450px;
  > div {
    width: 100%;
    height: 100%;
  }
`
const AddPath = ({ modal }: { modal: UseModalHook }) => {
  const { paths, setPaths } = useContext(PathsContext)

  return (
    <VTabsPage defaultSelected='Server'>
      <VTabsPage.Item title='Server' icon={faServer}>
        {({ setSelected }) => (
          <MaxSizer>
            <SelectPath
              modal={modal}
              edit={false}
              defaultPath='/'
              onSubmit={selectedPath => {
                setPaths([...paths, selectedPath])
                setSelected('Upload')
              }}
            />
          </MaxSizer>
        )}
      </VTabsPage.Item>
      <VTabsPage.Item title='Upload' icon={faCloudUpload}>
        <MaxSizer>
          <PathSink modal={modal} />
        </MaxSizer>
      </VTabsPage.Item>
      <VTabsPage.Item disabled title='Network' icon={faNetworkWired}>
        Network
      </VTabsPage.Item>
    </VTabsPage>
  )
}

export default AddPath
