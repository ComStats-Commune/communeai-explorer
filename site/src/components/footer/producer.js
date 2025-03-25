import styled from "styled-components";
import { Flex } from "../styled/flex";
import { Inter_14_500 } from "../../styles/text";

const Wrapper = styled(Flex)`
  flex-wrap: nowrap;

  > :not(:first-child) {
    margin-left: 8px;
  }

  .wrap-on-mobile {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  @media screen and (max-width: 600px) {
    justify-content: center;
    flex-wrap: wrap;
    div {
      flex-wrap: nowrap;
    }

    .wrap-on-mobile {
      flex-basis: 100%;
      justify-content: center;
      height: 20px;
    }
  }

  a {
    display: flex;
  }
`;

const Text = styled.p`
  margin: 0;
  ${Inter_14_500};
  color: ${(p) => p.theme.fontSecondary};
`;

export default function Producer() {
  return (
    <Wrapper>
      <Text>{`© ${new Date().getFullYear()} Comstats Explorer`}</Text>
    </Wrapper>
  );
}
