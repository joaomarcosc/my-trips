import dynamic from 'next/dynamic'

const Map = dynamic(() => import('components/Map'), { ssr: false })
const opa = 'ksoa'
export default function Home() {
  return (
    <>
      {opa}
      <Map />
    </>
  )
}
