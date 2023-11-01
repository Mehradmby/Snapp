import Image from 'next/image'
import { Inter } from 'next/font/google'
import MyForm from '@/modules/pageModules/mainPage/myForm'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
  <MyForm/>
  )
}
