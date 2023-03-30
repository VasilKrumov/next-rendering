import useSWR from 'swr'
import { useEffect, useState } from 'react'

export default function LastSalesPage(props) {
    const [sales, setSales] = useState([props.sales])
    const requestUrl = 'https://nextjs-course-51953-default-rtdb.firebaseio.com/sales.json'
    const { data, error } = useSWR(requestUrl, (url) => fetch(url).then((res) => res.json()))

    useEffect(() => {
        if (data) {
            const transformedSales = []
            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                })
            }
            setSales(transformedSales)
        }
    }, [data])

    if (error) {
        return <p>Failed to load.</p>
    }

    if (!data && !sales) {
        return <p>Loading...</p>
    }

    return (
        <ul>
            {sales.map((sale) => (
                <li key={sale.id}>
                    {sale.username} - {sale.volume}
                </li>
            ))}
        </ul>
    )
}

export async function getStaticProps() {
    return fetch('https://nextjs-course-51953-default-rtdb.firebaseio.com/sales.json')
        .then((res) => res.json())
        .then((data) => {
            const transformedSales = []
            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                })
            }
            return {
                props: {
                    sales: transformedSales,
                },
            }
        })
}
