import client from '@/graphql/client'
import { GetPageBySlugQuery, GetPagesQuery } from '@/graphql/generated/graphql'
import { GET_PAGES, GET_PAGE_BY_SLUG } from '@/graphql/queries'
import PageTemplate, { IPageTemplateProps } from '@/templates/Pages'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/dist/client/router'

// getStaticPaths -> gera urls em build time ex: /about
// getStaticProps -> busca dados na páginas em build time (props)
// getServerSideProps -> busca dados na páginas em runtime (props) (bundle fica no server)
// getIinitialProps -> busca dados na páginas em runtime (props) (bundle tambpem fica no client)

export default function Page({ heading, body }: IPageTemplateProps) {
  const router = useRouter()
  if (router.isFallback) return <h1>Erro 404</h1>
  return <PageTemplate heading={heading} body={body} />
}

export async function getStaticPaths() {
  const { pages } = await client.request<GetPagesQuery>(GET_PAGES, { first: 3 })

  const paths = pages.map(({ slug }) => ({ params: { slug } }))

  return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { page } = await client.request<GetPageBySlugQuery>(GET_PAGE_BY_SLUG, {
    slug: `${params?.slug}`
  })

  if (!page) {
    return { notFound: true }
  }

  return {
    revalidate: 5,
    props: {
      heading: page.heading,
      body: page.body.html
    }
  }
}
