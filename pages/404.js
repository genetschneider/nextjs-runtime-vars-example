import getConfig from 'next/config';

export default function NotFound({ value }) {
  return (
    <div>
      <h1>Custom 404 page! {'\n'} {value}</h1>
	  <h4>Config: {getConfig().publicRuntimeConfig['SECRET_X']}</h4>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      value: Date.now()
    }
  };
}