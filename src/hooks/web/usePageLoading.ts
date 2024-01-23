import { useAppStoreWithOut } from '@/store/modules/app'


export const usePageLoading = () => {
  const loadStart = () => {
    const appStore = useAppStoreWithOut()
  }

  const loadDone = () => {
    const appStore = useAppStoreWithOut()
  }

  return {
    loadStart,
    loadDone
  }
}
