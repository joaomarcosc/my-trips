import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo'
import { InfoOutline } from '@styled-icons/evaicons-outline/InfoOutline'
import LinkWrapper from '@/components/LinkWrapper'
import { IMapProps } from 'components/Map'

const Map = dynamic(() => import('components/Map'), { ssr: false })

export default function HomeTemplate({ places }: IMapProps) {
  return (
    <>
      <NextSeo
        title="My trips"
        description="A simple project to work with Typescript, React, NextJs"
        canonical="https://my-trips.joaomarcos.com.br"
        openGraph={{
          url: 'https://my-trips.joaomarcos.com.br',
          title: 'My trips',
          description: 'A simple project to work with Typescript, React, NextJs'
        }}
      />
      <LinkWrapper href="/about">
        <InfoOutline size={32} aria-label="About" />
      </LinkWrapper>
      <Map places={places} />
    </>
  )
}
