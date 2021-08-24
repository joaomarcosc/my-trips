import Link from 'next/link'
import { ReactNode } from 'react'
import * as S from './styles'

interface ILinkWrapperProps {
  href: string
  children: ReactNode
}

const LinkWrapper = ({ href, children }: ILinkWrapperProps) => (
  <S.Wrapper>
    <Link href={href}>{children}</Link>
  </S.Wrapper>
)

export default LinkWrapper
