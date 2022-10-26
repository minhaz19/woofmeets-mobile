import methods from "../../../../api/methods";
import { useApi } from "../../../../utils/helpers/api/useApi";

export const useGetMessages = (groupId, limit) => {
  const {request, loading} = useApi(methods._get);
  const slug = `v1/messages/group/${groupId}?limit=${limit}`
  const result = request(slug);
  return {
    result,
    loading,
  };
};
