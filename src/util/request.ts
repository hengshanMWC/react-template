export function createFormData(data: any) {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => formData.append(key, value as any))
  return formData
}
