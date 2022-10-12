import { FC, PropsWithChildren } from "react"
import { useTitle } from "../../utils/hooks"
import { ReactFCWithChildren } from "../../utils/types"
import { Header } from "./Header"

type IProps = {
  title: string,
}

export const MainTemplate: ReactFCWithChildren<IProps>= ({ title, children }) => {
  useTitle(title)
  return (
    <>
      <Header  />
      <main>{children}</main>
    </>
  )
}