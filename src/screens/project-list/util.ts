import { useMemo } from 'react'
import { useSetUrlSearchParam, useUrlQueryParam } from 'utils/url'
import { useProject } from '../../utils/project'

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
    setParam
  ] as const
}

export const useProjectsQueryKey = () => {
  const [param] = useProjectSearchParams()
  return ['projects', param]
}

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate'])
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam(['editingProjectId'])
  const setUrlParams = useSetUrlSearchParam()

  const { data: editingProject, isLoading } = useProject(Number(editingProjectId))

  const open = () => setProjectCreate({ projectCreate: true })
  const close = () => setUrlParams({ projectCreate: '', editingProjectId: '' })
  const startEdit = (id: number) => {
    setEditingProjectId({ editingProjectId: id })
  }
  // 路由url中会转换为字符串true
  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  }
}
