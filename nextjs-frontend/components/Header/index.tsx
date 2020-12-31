import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Container,
  MobileContainer,
  InnerGrid,
  MenuButton,
  CloseButton,
  Label,
  Background,
} from './style'

interface Props {
  activeRoute: string
}

const NavLinks = ({ activeRoute }: Props) => {
  return (
    <React.Fragment>
      <Label isActive={activeRoute === 'Home'}>
        <Link href="/">
          <a>Home</a>
        </Link>
      </Label>
    </React.Fragment>
  )
}

export default function Header() {
  const [isExpanded, setExpanded] = React.useState(false)
  const router = useRouter()

  let activeRoute = ''
  let activePath = ''
  if (router.pathname === '/') {
    activeRoute = 'Home'
    activePath = '/'
  }

  return (
    <React.Fragment>
      <MobileContainer expanded={isExpanded} data-cy="header">
        <Background className="bg-white bg-opacity-80 dark:bg-gray-1000" />
        {isExpanded ? (
          <React.Fragment>
            <CloseButton
              className="p-3 text-primary"
              onClick={() => setExpanded(false)}
              visible={isExpanded}
            >
              ×
            </CloseButton>
            <NavLinks activeRoute={activeRoute} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <MenuButton
              className="text-primary"
              onClick={() => setExpanded(true)}
            >
            </MenuButton>
            <Link href={activePath}>
              <a>
                <span className="text-primary">{activeRoute}</span>
              </a>
            </Link>
          </React.Fragment>
        )}
      </MobileContainer>

      <Container data-cy="header">
        <InnerGrid>
          <NavLinks activeRoute={activeRoute} />
        </InnerGrid>
        <Background className="bg-white bg-opacity-80 dark:bg-gray-1000" />
      </Container>
    </React.Fragment>
  )
}