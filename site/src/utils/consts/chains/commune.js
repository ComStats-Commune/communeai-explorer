import { ReactComponent as Commune } from "../../../components/icons/argon.svg";

const nodes = [
  {
    name: "CommuneRPC0",
    url: "wss://commune-archive-node-0.communeai.net",
  },
];

const commune = {
  name: "Commune",
  icon: <Commune />,
  value: "comai",
  symbol: "COMAI",
  decimals: 9,
  nodes,
  color: "#AF00C1",
  colorSecondary: "rgba(175, 0, 193, 0.1)",
  useOnChainBlockData: true,
};

export default commune;
