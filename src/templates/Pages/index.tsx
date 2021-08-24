import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline'
import LinkWrapper from '@/components/LinkWrapper'
import * as S from './styles'

export interface IPageTemplateProps {
  heading: string
  body: string
}

const PageTemplate = ({ heading, body }: IPageTemplateProps) => (
  <S.Content>
    <LinkWrapper href="/">
      <CloseOutline size={32} aria-label="Close" />
    </LinkWrapper>
    <S.Heading>{heading}</S.Heading>
    <S.Body>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </S.Body>
  </S.Content>
)
export default PageTemplate
