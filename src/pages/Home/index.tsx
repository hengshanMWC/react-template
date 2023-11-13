/* 主页 */

import ImgLogo from '@/assets/logo.png'
import { title } from '@/config'

export default function HomePageContainer(): JSX.Element {
  return (
    <div className="p0 pt-6">
      <div className="mx-a my-0 text-center font-bold">
        <p className="mb-2 text-[3rem]">{title}</p>
        <img src={ImgLogo} />
        <p className="mt-4 text-lg">
          react@v18、vite@v4、antd@v4、unocss、zustand@v4
          < br/>
          <a href="https://github.com/hengshanMWC/react-template">github</a>
        </p>
      </div>
    </div>
  )
}
