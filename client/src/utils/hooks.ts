import { useEffect, useState } from "react"

export const useTitle = (title: string) => {
  useEffect(() => {
    if (!title) {
      return
    }
    document.title = title
  }, [title])
}

export const useForm = <T extends Record<string, unknown>>(initData: T) => {
  const [formData, setFormData] = useState<T>(initData)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]:  e.target.value
    }))
  }
  const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]:  e.target.value === "" ? "" : +e.target.value
    }))
  }
  return {
    formData,
    setFormData,
    onChange,
    onChangeNumber
  }
}