import { useCallback, useEffect, useState } from "react";
import { useChainApi } from "../utils/hooks/chain/useChainApi";

export default function useOnChainAccountData(address) {
  const api = useChainApi();
  const [accountData, setAccountData] = useState();

  const fetchAccountData = useCallback(async () => {
    if (!api || !address) {
      return;
    }

    const [account, balanceAll, stakingInfo, stakedAccount] = await Promise.all(
      [
        api.query.system.account(address),
        api.derive.balances?.all(address).catch(() => null),
        api.derive.staking?.account(address).catch(() => null),
        api.query.subspaceModule.stakeTo.entries(address).catch(() => null),
      ],
    );
    const stakedAmount = stakedAccount.reduce(
      (sum, [, value]) => sum + value.toBn().toNumber(),
      0,
    );
    if (!account) {
      setAccountData(null);
      return;
    }

    const accountInfo = api.registry.createType(
      "AccountInfo",
      account.toHex(),
      true,
    );

    setAccountData({
      systemAccount: account,
      account: accountInfo,
      stakedAmount: stakedAmount,
      balanceAll,
      stakingInfo,
    });
  }, [api, address]);

  useEffect(() => {
    fetchAccountData().catch(() => setAccountData(null));
  }, [fetchAccountData]);

  return accountData;
}
