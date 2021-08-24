import client from '@/graphql/client'
import {
  GetPlaceBySlugQuery,
  GetPlacesQuery
} from '@/graphql/generated/graphql'
import { GET_PLACES, GET_PLACE_BY_SLUG } from '@/graphql/queries'
import PlaceTemplate, { IPlaceTemplateProps } from '@/templates/Places'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'

// getStaticPaths -> gera urls em build time ex: /about
// getStaticProps -> busca dados na páginas em build time (props)
// getServerSideProps -> busca dados na páginas em runtime (props) (bundle fica no server)
// getIinitialProps -> busca dados na páginas em runtime (props) (bundle tambpem fica no client)

export default function Place({ place }: IPlaceTemplateProps) {
  const router = useRouter()

  if (router.isFallback) return null

  return <PlaceTemplate place={place} />
}

export async function getStaticPaths() {
  const { places } = await client.request<GetPlacesQuery>(GET_PLACES, {
    first: 3
  })
  const paths = places.map(({ slug }) => ({ params: { slug } }))

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { place } = await client.request<GetPlaceBySlugQuery>(
    GET_PLACE_BY_SLUG,
    {
      slug: `${params?.slug}`
    }
  )

  if (!place) {
    return { notFound: true }
  }

  return {
    revalidate: 5,
    props: {
      place
    }
  }
}
