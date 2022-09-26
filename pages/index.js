import getConfig from 'next/config';

export default function Home({ value }) {
  const conf = getConfig().publicRuntimeConfig;

  return (
    <div>
      <h1>This page is using SSR! {'\n'} {value }</h1>
      <h4>Config: {conf['SECRET_X']}</h4>
    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {
      value: Date.now()
    }
  };
}