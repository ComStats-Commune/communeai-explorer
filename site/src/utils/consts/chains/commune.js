import { ReactComponent as Commune } from "../../../components/icons/commune.svg";

const nodes = [
  {
    name: "Archive Node",
    url: "wss://commune-archive-node-1.communeai.net",
  },
];

const commune = {
  name: "Commune",
  icon: <Commune style={{ width: "20px", height: "auto" }} />,
  value: "commune",
  symbol: "COMAI",
  decimals: 9,
  nodes,
  color: "#41BB91",
  colorSecondary: "#114f39",
  useOnChainBlockData: true,
};

export default commune;
