import fs from 'fs'
import path from 'path'
import Link from 'next/link'

function HomePage(props) {
    const { products } = props

    return (
        <ul>
            {products?.map((product) => (
                <li key={product.id}>
                    <Link href={`/${product.id}`}>{product.title}</Link>
                </li>
            ))}
        </ul>
    )
}

export async function getStaticProps() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
    const jsonData = fs.readFileSync(filePath)
    const data = JSON.parse(jsonData)

    return {
        props: {
            products: data.products,
        },
        revalidate: 10,
        // set the page to 404 in case of error
        // notFound: true,
        // redirect to another route in case of error
        // redirect: {
        //     destination: '/',
        // },
    }
}

export default HomePage
