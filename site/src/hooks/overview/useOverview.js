import { useCallback } from "react";
import { createGlobalState, useEffectOnce, useInterval } from "react-use";
import api from "../../services/api";
import { overviewApi } from "../../services/urls";
import useIsRelayChain from "../../utils/hooks/chain/useIsRelayChain";

const useGlobalData = createGlobalState({});
const useGlobalLoading = createGlobalState(true);
const useGlobalFetching = createGlobalState(false);

export default function useOverview() {
  const [overview, setOverview] = useGlobalData();
  const [loading, setLoading] = useGlobalLoading();
  const [isFetching, setIsFetching] = useGlobalFetching();

  const isRelay = useIsRelayChain();

  const fetchOverview = useCallback(() => {
    if (isFetching) {
      return;
    }

    setIsFetching(true);

    Promise.all([
      api.fetch(overviewApi),
      fetch("https://api-v2.comstats.org/stats/", {
        method: "GET",
        headers: {
          accept: "*/*",
        },
      })
        .then((response) => response.json())
        .then((data) => data.stats)
        .catch((err) => {
          return null;
        }),
    ])
      .then(([apiResp, stat]) => {
        setOverview({
          ...apiResp.result,
          totalStake: Math.round(stat.totalStake * 1e9).toString() || null,
        });
        setLoading(false);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [isFetching, setIsFetching, setOverview, setLoading]);

  useEffectOnce(fetchOverview);

  useInterval(
    () => {
      fetchOverview();
    },
    isRelay ? 6000 : 12000,
  );

  return { overview, loading };
}
