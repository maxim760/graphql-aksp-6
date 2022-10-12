import { toast, TypeOptions } from "react-toastify"

export const getAuthorFullname = <T extends { firstName: string, lastName: string, patronymic?: string }>(author: T) => {
  return `${author.lastName} ${author.firstName[0]}. ${author.patronymic ? author.patronymic[0] + "." : ""}` 
}

export const showToast = (text: React.ReactNode, type: TypeOptions) => {
  toast(text, {
    hideProgressBar: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    type
  })
}