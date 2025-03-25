import styled, { css } from "styled-components";
import { Button } from "../../styled/buttons";
import { Flex } from "../../styled/flex";
import { smcss } from "../../../styles/responsive";
import ExploreInputOrigin from "./input";
import { useRef } from "react";
import { bg_theme500, w_full } from "../../../styles/tailwindcss";
import { useIsDark } from "../../../utils/hooks";

const ExploreInput = styled(ExploreInputOrigin)`
  ${w_full};
`;

const ExploreButton = styled(Button)`
  ${(p) => p.dark && bg_theme500};
`;

const Wrapper = styled(Flex)`
  width: 644px;
  position: relative;
  gap: 16px;

  ${smcss(w_full)};
  ${smcss(css`
    flex-wrap: wrap;
    input,
    button {
      flex-basis: 100%;
    }
  `)}
`;

export default function Explore() {
  const exploreRef = useRef();
  const isDark = useIsDark();

  function handleExplore() {
    exploreRef.current.handleExplore();
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Wrapper style={{ gap: 16 }}>
        <ExploreInput ref={exploreRef} />
        <ExploreButton dark={isDark} onClick={handleExplore}>
          Explore
        </ExploreButton>
      </Wrapper>
    </div>
  );
}
