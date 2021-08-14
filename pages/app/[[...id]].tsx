import React, { FC, useState } from 'react'
import { Pane, Dialog, majorScale } from 'evergreen-ui'
import { useRouter } from 'next/router'
import Logo from '../../components/logo'
import FolderList from '../../components/folderList'
import NewFolderButton from '../../components/newFolderButton'
import User from '../../components/user'
import FolderPane from '../../components/folderPane'
import DocPane from '../../components/docPane'
import NewFolderDialog from '../../components/newFolderDialog'
import { getSession, useSession } from 'next-auth/client'

import { folder, doc } from '../../db'

const App: FC<{ folders?: any[]; activeFolder?: any; activeDoc?: any; activeDocs?: any[] }> = ({
  folders,
  activeDoc,
  activeFolder,
  activeDocs,
}) => {

  const [session, loading] = useSession() // can also pass as prop
  const router = useRouter()
  const [newFolderIsShown, setIsShown] = useState(false)

  if (loading) {
    return null
  }


  const Page = () => {
    if (activeDoc) {
      return <DocPane folder={activeFolder} doc={activeDoc} />
    }

    if (activeFolder) {
      return <FolderPane folder={activeFolder} docs={activeDocs} />
    }

    return null
  }

  // Not authorized
  if (!loading && !session) {
    return (
      <Dialog
        isShown
        title="Session expired"
        confirmLabel="Ok"
        hasCancel={false} // unclosable Modal
        hasClose={false} // unclosable Modal
        shouldCloseOnOverlayClick={false} // unclosable Modal
        shouldCloseOnEscapePress={false} // unclosable Modal
        onConfirm={() => router.push('/signin')}
      >
        Sign in to continue
      </Dialog>
    )
  }

  return (
    <Pane position="relative">
      <Pane width={300} position="absolute" top={0} left={0} background="tint2" height="100vh" borderRight>
        <Pane padding={majorScale(2)} display="flex" alignItems="center" justifyContent="space-between">
          <Logo />

          <NewFolderButton onClick={() => setIsShown(true)} />
        </Pane>
        <Pane>
          <FolderList folders={[{ _id: 1, name: 'hello' }]} />{' '}
        </Pane>
      </Pane>
      <Pane marginLeft={300} width="calc(100vw - 300px)" height="100vh" overflowY="auto" position="relative">
        <User user={session.user} />
        <Page />
      </Pane>
      <NewFolderDialog close={() => setIsShown(false)} isShown={newFolderIsShown} onNewFolder={() => { }} />
    </Pane>
  )
}

App.defaultProps = {
  folders: [],
}

/**
 * getServerSideProps
 * 
 * getServerSideProps vs getStaticSideProps
 * 1. getServerSideProps: Used for Dynamic Page (Runtime). This is Create blog aka SPA
 * 2. getStaticSideProps: Build type
 */
export async function getServerSideProps(ctx) {
  console.log(`Server side props Hit`)
  const session = await getSession(ctx)

  return {
    props: { session },
  }
}


/**
 * Catch all handler. Must handle all different page
 * states.
 * 1. Folders - none selected /app 
 * 2. Folders => Folder selected /app/hello
 * 3. Folders => Folder selected => Document selected /app/hello/hello1.md
 *
 * An unauth user should not be able to access this page.
 *
 * @param context
 */



export default App
