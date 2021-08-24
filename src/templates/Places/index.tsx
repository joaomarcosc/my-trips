import Image from 'next/image'
import { NextSeo } from 'next-seo'
import LinkWrapper from '@/components/LinkWrapper'
import { CloseOutline } from '@styled-icons/evaicons-outline/CloseOutline'
import * as S from './styles'
import { useRouter } from 'next/dist/client/router'

export interface IImageProps {
  url: string
  height: string
  width: string
}
export interface IPlaceTemplateProps {
  place: {
    slug: string
    name: string
    description?: {
      html: string
      text: string
    }
    gallery: IImageProps[]
  }
}

export default function PlaceTemplate({ place }: IPlaceTemplateProps) {
  const router = useRouter()

  if (router.isFallback) return null

  return (
    <>
      <NextSeo
        title={`${place.name} - My Trips`}
        description={
          place.description?.text ||
          'A simple project to show in a map the places that I went and show more informations and photos when clicked.'
        }
        canonical="https://mytrips.com"
        openGraph={{
          url: 'https://mytrips.com',
          title: `${place.name} - My Trips`,
          description:
            place.description?.text ||
            'A simple project to show in a map the places that I went and show more informations and photos when clicked.',
          images: [
            {
              url: place.gallery[0].url,
              width: Number(place.gallery[0].width),
              height: Number(place.gallery[0].height),
              alt: `${place.name}`
            }
          ]
        }}
      />
      <LinkWrapper href="/">
        <CloseOutline size={32} aria-label="Go back to map" />
      </LinkWrapper>
      <S.Wrapper>
        <S.Container>
          <S.Heading>{place.name}</S.Heading>
          <S.Body
            dangerouslySetInnerHTML={{ __html: place.description?.html || '' }}
          />
          <S.Gallery>
            {place.gallery.map((image, index) => (
              <>
                <Image
                  key={`photo-${index}`}
                  src={image.url}
                  alt={place.name}
                  width={image.width}
                  height={image.height}
                  quality={75}
                />
                <S.Caption>
                  <>
                    Você pode ver mais fotos minhas no{' '}
                    <a href="https://unsplash.com/">Unsplash</a>
                  </>
                </S.Caption>
              </>
            ))}
          </S.Gallery>
        </S.Container>
      </S.Wrapper>
    </>
  )
}
