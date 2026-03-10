import { useQuery } from '@tanstack/vue-query'
import { getUserInfo, getUserAddress } from '@/services/user.service'

export const useUserInfoQuery = () => {
  const query = useQuery({
    queryKey: ['user-info'],
    queryFn: () => getUserInfo(),
    staleTime: 1000 * 60 * 5, // 5 min
    refetchOnWindowFocus: false,
  })

  return query
}

export const useUserAddressQuery = () => {
  const query = useQuery({
    queryKey: ['user-address'],
    queryFn: () => getUserAddress(),
    staleTime: 1000 * 60 * 5, // 5 min
    refetchOnWindowFocus: false,
  })

  return query
}
