import { useContext } from "react";
import { MainContext } from "../MainBody";
import styled, { css, keyframes } from "styled-components";
import { hoverSupported } from "../hoverSupported";
import { QUERIES } from "../constants";
import ClickableWrapper from "../ClickableWrapper";

const appear = keyframes`
  0% {
    transform: scale(0) translateX(-200%);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateX(0%);
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  border-left: 4px solid
    ${(p) => (p.featured ? "var(--color-desat-dark-cyan);" : "transparent")};
  padding: 32px;
  width: 80%;
  background-color: var(--color-white);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 5px 5px 17px var(--color-dark-gray-cyan);

  animation: 0.3s ${appear} ease-in-out forwards;

  @media ${QUERIES.tabletAndSmaller} {
    flex-direction: column;
    align-items: start;
  }
`;

const Logo = styled.img`
  object-fit: cover;
  width: 75px;
  height: 75px;
  border-radius: 50%;

  @media ${QUERIES.tabletAndSmaller} {
    margin-top: -60px;
    width: 60px;
    height: 60px;
  }
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IsNew = styled.span`
  padding: 4px 8px;
  border-radius: 16px;
  background-color: var(--color-desat-dark-cyan);
  color: var(--color-white);
  font-size: ${12 / 16}rem;
  font-weight: var(--font-weight-bold);
  line-height: ${16 / 16}rem;

  @media ${QUERIES.tabletAndSmaller} {
    margin-left: 20px;
  }
`;

const IsFeatured = styled(IsNew)`
  background-color: var(--color-very-dark-gray-cyan);

  @media ${QUERIES.tabletAndSmaller} {
    margin-left: 0px;
  }
`;

const CompanyName = styled.span`
  color: var(--color-desat-dark-cyan);
  font-weight: var(--font-weight-bold);
`;

const EntryDesc = styled.span`
  font-family: var(--font-primary);
  color: var(--color-very-dark-gray-cyan);
  font-weight: var(--font-weight-bold);
  font-size: ${16 / 16}rem;
`;

const BottomRow = styled(TopRow)`
  gap: 10px;
  margin-top: -4px;
`;

const BottomEntry = styled.span`
  color: var(--color-dark-gray-cyan);
`;

const BottomDot = styled.div`
  width: 3px;
  height: 3px;
  background-color: var(--color-dark-gray-cyan);
`;

const TagsWrapper = styled.div`
  margin-left: auto;
  display: flex;
  gap: 12px;
  align-items: center;

  @media ${QUERIES.tabletAndSmaller} {
    margin-left: 0px;
    flex-wrap: wrap;
    padding-top: 12px;
    width: 100%;
    border-top: 1px solid var(--color-dark-gray-cyan);
  }
`;

const Tag = styled.button`
  user-select: none;
  padding: 4px;
  background-color: var(--color-light-gray-cyan);
  color: var(--color-desat-dark-cyan);
  font-weight: var(--font-weight-bold);
  border: 2px solid
    ${(p) => (p.enabled ? "var(--color-desat-dark-cyan)" : "transparent")};
  border-radius: 8px;
  cursor: pointer;
  opacity: ${(p) => (p.enabled ? "0.7" : "1")};
  transition: all 0.3s ease-in-out;

  &:focus {
    outline: 3px solid var(--color-dark-gray-cyan);
    outline-offset: 3px;
  }

  ${hoverSupported(css`
    &:hover {
      transform: scale(1.2);
      border-color: var(--color-desat-dark-cyan);
    }
  `)}
`;

function Card({ item, data, ...props }) {
  const { filterList, setFilterList } = useContext(MainContext);

  const addToFilter = (tag) => {
    const tmp = [...filterList];

    if (tmp.includes(tag)) {
      const result = [];
      for (let entry of tmp) {
        if (entry === tag) {
          continue;
        }
        result.push(entry);
      }

      setFilterList(result);
    } else {
      tmp.push(tag);
      setFilterList(tmp);
    }
  };

  return (
    <Wrapper featured={item.featured} {...props}>
      <Logo src={item.logo} alt={`${item.company} logo`} />
      <DetailsWrapper>
        <TopRow>
          <CompanyName aria-label={"company name"}>{item.company}</CompanyName>
          {item.new ? <IsNew>NEW!</IsNew> : ""}
          {item.featured ? <IsFeatured>FEATURED</IsFeatured> : ""}
        </TopRow>
        <EntryDesc aria-label={"job position"}>{item.position}</EntryDesc>
        <BottomRow>
          <BottomEntry aria-label={"when it was posted"}>
            {item.postedAt}
          </BottomEntry>
          <BottomDot />
          <BottomEntry aria-label={"contact information"}>
            {item.contract}
          </BottomEntry>
          <BottomDot />
          <BottomEntry aria-label={"job location"}>{item.location}</BottomEntry>
        </BottomRow>
      </DetailsWrapper>
      <TagsWrapper>
        <ClickableWrapper
          enabled={filterList.includes(item.role)}
          onClick={() => {
            addToFilter(item.role);
          }}
          aria-label={"job role"}
        >
          <Tag>{item.role}</Tag>
        </ClickableWrapper>

        <ClickableWrapper
          enabled={filterList.includes(item.level)}
          onClick={() => {
            addToFilter(item.level);
          }}
          aria-label={"job level"}
        >
          <Tag>{item.level}</Tag>
        </ClickableWrapper>
        {item.languages.map((lang) => (
          <ClickableWrapper
            enabled={filterList.includes(lang)}
            key={`${item.id}-${lang}`}
            onClick={() => {
              addToFilter(lang);
            }}
            aria-label={"language required"}
          >
            <Tag>{lang}</Tag>
          </ClickableWrapper>
        ))}
      </TagsWrapper>
    </Wrapper>
  );
}

export default Card;
