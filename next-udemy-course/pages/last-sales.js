import { useEffect, useState } from 'react';
import useSWR from 'swr';

const LastSalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);
  const fetcher = (...args) => fetch(...args).then((res) => res.json())

  const { data, error } = useSWR(
    'https://nextjs-udemy-course-8ef7f-default-rtdb.firebaseio.com/sales.json', fetcher
  );

  useEffect(() => {
    if(data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({ 
          id: key, 
          username: data[key].username, 
          volume: data[key].volume 
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  if(error) {
    return <p>Failed to load</p>
  }
  if(!data && !sales) {
    return <p>Loading...</p>
  }
  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}
export async function getStaticProps() {
  const res = await fetch(
    'https://nextjs-udemy-course-8ef7f-default-rtdb.firebaseio.com/sales.json'
  )
  const data = await res.json()
  const transformedSales = [];
  for (const key in data) {
    transformedSales.push({ 
      id: key, 
      username: data[key].username, 
      volume: data[key].volume 
    })
  }
  return {
    props: {
      sales: transformedSales
    }, 
  }
}
export default LastSalesPage