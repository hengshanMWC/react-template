import { useMemoizedFn, useSetState } from 'ahooks'

type ResetState = () => void

export function useSetResetState<S extends Record<string, any>>(initialState: Parameters<typeof useSetState<S>>[0]): [...ReturnType<typeof useSetState<S>>, ResetState] {
  const [state, setState] = useSetState(initialState)

  const resetState = useMemoizedFn(() => {
    setState(initialState)
  })

  return [state, setState, resetState]
}
