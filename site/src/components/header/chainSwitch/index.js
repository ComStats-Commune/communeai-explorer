import { useRef, useState } from "react";
import styled from "styled-components";
import { Flex } from "../../styled/flex";
import { useSelector } from "react-redux";
import { chainSettingSelector } from "../../../store/reducers/settingSlice";
import { Inter_14_600 } from "../../../styles/text";
import { useOnClickOutside } from "@osn/common";
import { Dropdown } from "../styled";

const Wrapper = styled.div`
  position: relative;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.fontPrimary};
  ${Inter_14_600};
`;

export default function ChainSwitch() {
  const currentNode = useSelector(chainSettingSelector);
  const [show, setShow] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setShow(false));

  return (
    <Wrapper ref={ref} onClick={() => setShow((state) => !state)}>
      <Dropdown active={show}>
        <Flex>
          {currentNode.icon}
          <Text>{currentNode.name}</Text>
        </Flex>
      </Dropdown>
    </Wrapper>
  );
}
